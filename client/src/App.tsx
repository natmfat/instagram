import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SWRConfig } from "swr";
import { fetcher } from "./lib/fetcher";

import { Dashboard } from "./routes/Dashboard";
import { Thread } from "./routes/Thread";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/thread/:threadId",
    element: <Thread />,
  },
]);

export default function App() {
  return (
    <SWRConfig value={{ fetcher }}>
      <div className="relative max-w-xl mx-auto px-4 py-6">
        <RouterProvider router={router} />
      </div>
    </SWRConfig>
  );
}
