import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import RootLayout from "./layout/RootLayout/RootLayout";
import ErrorPage from "./pages/Error";
// import HomePage, { loader as movieRecommendationsLoader } from "./pages/Home";
// import SeriesPage, { loader as tvShowsLoader } from "./pages/Series";
// import FilmsPage from "./pages/Films";
// import LatestPage from "./pages/Latest";
// import MyListPage from "./pages/MyList";
// import SearchPage, { loader as searchLoader } from "./pages/Search";

const HomePage = lazy(() => import("./pages/Home"));
const SeriesPage = lazy(() => import("./pages/Series"));
const FilmsPage = lazy(() => import("./pages/Films"));
const LatestPage = lazy(() => import("./pages/Latest"));
const MyListPage = lazy(() => import("./pages/MyList"));
const SearchPage = lazy(() => import("./pages/Search"));

// Test Code: Manually & with automated tests
// Optimize Code: Optimize user experience & performance
// Build App: Run build process to parse, transform & optimize code
// Upload App: Upload production code to hosting server
// Configure Project for Deployment: Ensure app is served securely & as intended

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <HomePage />
          </Suspense>
        ),
        loader: () => import("./pages/Home").then((module) => module.loader()),
      },
      {
        path: "series",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <SeriesPage />
          </Suspense>
        ),
        loader: () =>
          import("./pages/Series").then((module) => module.loader()),
      },
      {
        path: "films",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <FilmsPage />
          </Suspense>
        ),
        loader: () => import("./pages/Films").then((module) => module.loader()),
      },
      {
        path: "latest",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <LatestPage />
          </Suspense>
        ),
      },
      {
        path: "myList",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <MyListPage />
          </Suspense>
        ),
      },
      {
        path: "search",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <SearchPage />
          </Suspense>
        ),
        loader: (meta) =>
          import("./pages/Search").then((module) => module.loader(meta)),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
