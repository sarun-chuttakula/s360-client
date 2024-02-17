import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <div className="missing-container">
      <article className="missing-page">
        <h1>Oops!</h1>
        <p>Page Not Found</p>
        <div className="flexGrow">
          <Link to="/">Visit Our Homepage</Link>
        </div>
      </article>
    </div>
  );
};

export default Missing;
