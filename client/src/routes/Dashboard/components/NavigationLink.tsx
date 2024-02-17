import type React from "react";
import { cn } from "../../../lib/cn";

export const NavigationLink = ({
  children,
  className,
}: React.ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      className={cn(
        "cursor-pointer rounded-md font-semibold align-top w-fit px-3 py-0.5",
        className
      )}
    >
      {children}
    </div>
  );
};
