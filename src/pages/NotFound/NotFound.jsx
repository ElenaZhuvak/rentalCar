import { Link } from "react-router-dom";
import css from './NotFound.module.css'

const NotFound = () => {
  return (
    <div className={css.notFoundPage}>
        <h3>Page not found. Try again</h3>
        <Link to='/catalog'>Go to our list of cars</Link>
    </div>
  );
};

export default NotFound;