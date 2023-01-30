import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Routes } from "project-constants";

import App from "./App";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
const RemoteApp = React.lazy(() => import("remote/App"));

const router = createBrowserRouter([
  {
    path: Routes.Host,
    element: <App />,
    errorElement: <div>Error!</div>,
  },
  {
    path: Routes.Remote,
    element: (
      <Suspense fallback="Loading...">
        <RemoteApp />
      </Suspense>
    ),
    errorElement: <div>Error!</div>,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
