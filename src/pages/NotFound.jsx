import { useRouteError } from "react-router-dom";

export default function NotFound() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <img className="notfound" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgbXb68ADcxtTq1T9P0h2XPZhJnLg5P7Kzog&s"></img>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}