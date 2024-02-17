import useSWR from "swr";

import type { Thread as ThreadType } from "../lib/instagram.types";
import { Thread } from "./Thread";

export const Threads = () => {
  const { data, isLoading } = useSWR<ThreadType[]>("/api/inbox");

  return (
    <main className="flex flex-col gap-3 pt-1 pb-6">
      {data && !isLoading
        ? data.map((thread) => <Thread {...thread} key={thread.title} />)
        : null}
    </main>
  );
};
