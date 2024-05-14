import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import PageNotFound from "../page-not-found";

const ErrorPage = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 401) {
      return <p>Sorry, an 401 error has occurred.</p>
    }
    else if (error.status === 404) {
      return <PageNotFound />
    }
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default ErrorPage;