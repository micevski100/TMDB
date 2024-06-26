import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./layout/RootLayout/RootLayout";
import ErrorPage from "./pages/Error";

// Test Code: Manually & with automated tests
// Optimize Code: Optimize user experience & performance
// Build App: Run build process to parse, transform & optimize code
// Upload App: Upload production code to hosting server
// Configure Project for Deployment: Ensure app is served securely & as intended

const HomePage = lazy(() => import("./pages/Home"));
const SeriesPage = lazy(() => import("./pages/Series"));
const FilmsPage = lazy(() => import("./pages/Films"));
const LatestPage = lazy(() => import("./pages/Latest"));
const MyListPage = lazy(() => import("./pages/MyList"));
const SearchPage = lazy(() => import("./pages/Search"));

const LoadingFallback = () => (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <p>Loading...</p>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <HomePage />
          </Suspense>
        ),
        loader: () => import("./pages/Home").then((module) => module.loader()),
      },
      {
        path: "series",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SeriesPage />
          </Suspense>
        ),
        loader: () =>
          import("./pages/Series").then((module) => module.loader()),
      },
      {
        path: "films",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <FilmsPage />
          </Suspense>
        ),
        loader: () => import("./pages/Films").then((module) => module.loader()),
      },
      {
        path: "latest",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <LatestPage />
          </Suspense>
        ),
      },
      {
        path: "myList",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <MyListPage />
          </Suspense>
        ),
      },
      {
        path: "search",
        element: (
          <Suspense fallback={<LoadingFallback />}>
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
