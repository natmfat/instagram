import {
  IgApiClient,
  type AccountRepositoryLoginResponseLogged_in_user,
  type DirectInboxFeedResponseThreadsItem,
} from "instagram-private-api";
import invariant from "invariant";
import "dotenv/config";

import path from "path";
import fs from "fs";

export interface User {
  pk: number;
  username: string;
  fullName: string;
  profilePicture: string;
}

export interface Message {
  userId: number;
  text: string;
}

export interface Thread {
  id: string;
  title: string;
  users: User[];
  messages: Message[];
}

export interface InstagramProps {
  username: string;
  password: string;
  useFakeData?: boolean;
}

export class Instagram {
  private ig = new IgApiClient();
  private username: string;
  private password: string;
  private useFakeData: boolean;

  public user?: User = undefined;

  constructor({ username, password, useFakeData = false }: InstagramProps) {
    this.username = username;
    this.password = password;
    this.useFakeData = useFakeData;

    this.ig.state.generateDevice(this.username);
  }

  async login() {
    if (this.useFakeData) {
      this.user = {
        pk: 0,
        username: "nap.004",
        fullName: "Nathan",
        profilePicture: "",
      };

      return;
    }

    await this.ig.simulate.preLoginFlow();
    this.user = Instagram.formatUser(
      await this.ig.account.login(this.username, this.password)
    );
  }

  async getInbox(fullInbox = false): Promise<Thread[]> {
    if (this.useFakeData) {
      const threads = JSON.parse(
        (
          await fs.promises.readFile(
            path.resolve(__dirname, "./threads.json"),
            "utf-8"
          )
        ).toString()
      );

      return threads.map(Instagram.formatThread);
    }

    const directInbox = this.ig.feed.directInbox();
    const threads: DirectInboxFeedResponseThreadsItem[] =
      await directInbox.items();

    while (fullInbox && directInbox.isMoreAvailable()) {
      const threadsBatch = await directInbox.items();
      threads.push(...threadsBatch);
    }

    return threads.map(Instagram.formatThread);
  }

  async getUser(id?: number | string): Promise<User> {
    if (!id) {
      invariant(this.user, "Expected Instagram user");
      return this.user;
    }

    return Instagram.formatUser(await this.ig.user.info(id));
  }

  static formatThread(thread: DirectInboxFeedResponseThreadsItem): Thread {
    return {
      id: thread.thread_id,
      title: thread.thread_title,
      users: thread.users.map(Instagram.formatUser),
      messages: thread.items
        .filter((item) => item.text)
        .map((item) => ({
          userId: item.user_id,
          text: item.text!,
        })),
    };
  }

  static formatUser(
    user: Record<"username" | "full_name" | "profile_pic_url", string> & {
      pk: number;
    }
  ): User {
    return {
      pk: user.pk,
      username: user.username,
      fullName: user.full_name,
      profilePicture: user.profile_pic_url,
    };
  }
}

invariant(process.env.IG_USERNAME, "Expected Instagram username");
invariant(process.env.IG_PASSWORD, "Expected Instagram password");

export const instagram = new Instagram({
  username: process.env.IG_USERNAME,
  password: process.env.IG_PASSWORD,
  useFakeData: true,
});
