import type { Thread as ThreadProps } from "../lib/instagram.types";
import { ThreadAvatars } from "./ThreadAvatars";

export const Thread = ({ title, users = [], messages = [] }: ThreadProps) => {
  return (
    <article className="cursor-pointer flex gap-2 items-center">
      <ThreadAvatars users={users} />
      <div className="flex-1 w-full">
        <h1 className="text-black">{title}</h1>
        <p className="text-gray-500 overflow-x-hidden whitespace-nowrap text-ellipsis">
          {messages.length > 0 ? messages[0].text : "Seen"}
        </p>
      </div>
    </article>
  );
};
