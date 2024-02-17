import useSWR from "swr";
import { useParams, useNavigate } from "react-router-dom";
import { Thread as ThreadType } from "../../lib/instagram.types";
import { ThreadAvatars } from "../Dashboard/components/ThreadAvatars";
import { corsAnywhere } from "../../lib/corsAnywhere";

export const Thread = () => {
  const { data, isLoading } = useSWR<ThreadType[]>("/api/inbox");
  const { threadId } = useParams();
  const navigate = useNavigate();

  const thread = data?.find((thread) => thread.id === threadId)!;
  if ((!thread && !isLoading) || (!thread && data)) {
    navigate("/");
    return null;
  }

  return (
    <div className="pt-10">
      <header className="absolute top-0 w-full py-2 flex items-center gap-3 border-b border-b-gray-200">
        <ThreadAvatars users={thread.users} />
        <h1 className="text-xl font-bold">{thread.title}</h1>
      </header>

      {thread.messages.map((message, i) => {
        const user = thread.users.find((user) => message.userId === user.pk);
        if (!user) {
          return null;
        }

        return (
          <div key={i} className="mt-3 flex gap-2 items-end">
            <img
              className="w-7 h-7 object-cover rounded-full flex-shrink-0 border border-gray-200"
              src={corsAnywhere(user.profilePicture)}
            />

            <p className="px-3 py-1.5 rounded-xl flex-shrink-1 bg-gray-100 text-black w-fit">
              {message.text}
            </p>
          </div>
        );
      })}
    </div>
  );
};
