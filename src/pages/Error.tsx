useRouteError;
import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/Header/MainNavigation";

type RouteError = {
  status: number;
  data?: { message?: string };
};

const ErrorPage = () => {
  const error = useRouteError() as RouteError;

  let title = "An error occured!";
  let message = "Could not find this page!";

  if (error.status === 500 && error.data && error.data.message) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not Found!";
    message = "Could not find resource or page.";
  }

  return (
    <>
      <MainNavigation />
      <main className='text-center mt-5'>
        <h1>{title}</h1>
        <p>{message}</p>
      </main>
    </>
  );
};

export default ErrorPage;
