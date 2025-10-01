import { Link } from "react-router-dom";
import css from './NotFound.module.css'

const NotFound = () => {
  return (
    <main>
      <div className={css.notFoundPage}>
          <h3>Page not found. Try again</h3>
          <Link to='/catalog'>Go to the catalog page</Link>
      </div>
    </main>
  );
};

export default NotFound;