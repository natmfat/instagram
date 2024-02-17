import {
  IgApiClient,
  type AccountRepositoryLoginResponseLogged_in_user,
  type DirectInboxFeedResponseThreadsItem,
} from "instagram-private-api";
import invariant from "invariant";
import "dotenv/config";

export interface User {
  username: string;
  fullName: string;
  profilePicture: string;
}

export interface Message {
  userId: number;
  text: string;
}

export interface Thread {
  title: string;
  users: User[];
  messages: Message[];
}

export interface InstagramProps {
  username: string;
  password: string;
}

export class Instagram {
  private ig = new IgApiClient();
  private username: string;
  private password: string;

  public user?: AccountRepositoryLoginResponseLogged_in_user = undefined;

  constructor({ username, password }: InstagramProps) {
    this.username = username;
    this.password = password;
    this.ig.state.generateDevice(this.username);
  }

  async login() {
    await this.ig.simulate.preLoginFlow();
    this.user = await this.ig.account.login(this.username, this.password);
  }

  async getInbox(fullInbox = false): Promise<Thread[]> {
    const directInbox = this.ig.feed.directInbox();
    const threads: DirectInboxFeedResponseThreadsItem[] =
      await directInbox.items();

    while (fullInbox && directInbox.isMoreAvailable()) {
      const threadsBatch = await directInbox.items();
      threads.push(...threadsBatch);
    }

    return threads.map((thread) => ({
      title: thread.thread_title,
      users: thread.users.map((user) => Instagram.formatUser(user)),
      messages: thread.items
        .filter((item) => item.text)
        .map((item) => ({
          userId: item.user_id,
          text: item.text!,
        })),
    }));
  }

  static formatUser(user: {
    username: string;
    full_name: string;
    profile_pic_url: string;
  }): User {
    return {
      username: user.username,
      fullName: user.full_name,
      profilePicture: user.profile_pic_url,
    };
  }

  async getUser(id?: number | string): Promise<User> {
    if (!id) {
      invariant(this.user, "Expected Instagram user");

      return Instagram.formatUser(this.user);
    }

    return Instagram.formatUser(await this.ig.user.info(id));
  }
}

invariant(process.env.IG_USERNAME, "Expected Instagram username");
invariant(process.env.IG_PASSWORD, "Expected Instagram password");

export const instagram = new Instagram({
  username: process.env.IG_USERNAME,
  password: process.env.IG_PASSWORD,
});
