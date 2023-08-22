import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ErrorPage from "./components/UI/ErrorPage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";
import Kanjis from "./components/KANJI/Kanjis.tsx";
import Kanji from "./components/KANJI/Kanji.tsx";
import KanjiDetail from "./components/KANJI/KanjiDetail.tsx";

const client = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "joyo", element: <Kanjis />, errorElement: <ErrorPage /> },
      {
        path: "kanji/:kanji",
        element: <KanjiDetail />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
