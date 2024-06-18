import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import RootLayout from "./layout/RootLayout/RootLayout";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import SeriesPage from "./pages/Series";
import FilmsPage from "./pages/Films";
import LatestPage from "./pages/Latest";
import MyListPage from "./pages/MyList";
import SearchPage from "./pages/Search";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/series", element: <SeriesPage /> },
      { path: "/films", element: <FilmsPage /> },
      { path: "/latest", element: <LatestPage /> },
      { path: "/myList", element: <MyListPage /> },
      { path: "/search", element: <SearchPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
