import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error: any = useRouteError();
  console.log(error);

  return (
    <div>
      <h1>oops!</h1>
      <h2>sorry, an unexpected problems has occured</h2>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
