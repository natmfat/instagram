import { cn } from "../lib/cn";
import { corsAnywhere } from "../lib/corsAnywhere";
import { PersonIcon } from "@radix-ui/react-icons";
import type { User } from "../lib/instagram.types";

const PROFILE_CLASS_NAME =
  "h-12 w-12 flex-shrink-0 bg-gray-200 rounded-full border border-gray-300 object-cover";

interface ThreadAvatarsProps {
  users: User[];
}

export const ThreadAvatars = ({ users }: ThreadAvatarsProps) => {
  if (users.length === 0) {
    return (
      <div
        className={cn(PROFILE_CLASS_NAME, "flex items-center justify-center")}
      >
        <PersonIcon className="h-5 w-5" />
      </div>
    );
  } else if (users.length === 1) {
    return (
      <img
        className={PROFILE_CLASS_NAME}
        src={corsAnywhere(users[0]?.profilePicture)}
      />
    );
  }

  return (
    <div className="w-12 h-12 flex-shrink-0 relative">
      <img
        className={cn(PROFILE_CLASS_NAME, "h-9 w-9")}
        src={corsAnywhere(users[0]?.profilePicture)}
      />
      <img
        className={cn(
          PROFILE_CLASS_NAME,
          "h-9 w-9 absolute bottom-0 right-0 z-10 outline outline-4 border-none outline-white"
        )}
        src={corsAnywhere(users[users.length - 1]?.profilePicture)}
      />
    </div>
  );
};
