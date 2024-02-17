import useSWR from "swr";
import type { User } from "../lib/instagram.types";

export const Header = () => {
  const { data, isLoading } = useSWR<User>("/api/user");

  return (
    <header className="pt-6">
      {data && !isLoading ? (
        <h1 className="text-xl font-bold">{data.username}</h1>
      ) : null}
    </header>
  );
};
