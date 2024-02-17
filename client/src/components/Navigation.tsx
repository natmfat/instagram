import { NavigationLink } from "./NavigationLink";

export const Navigation = () => {
  return (
    <nav className="py-2 flex gap-2 select-none">
      <NavigationLink className="text-blue-500 bg-blue-100">
        Messages
      </NavigationLink>

      <NavigationLink className="cursor-not-allowed text-black bg-gray-200">
        Requests
      </NavigationLink>
    </nav>
  );
};
