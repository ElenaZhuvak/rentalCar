import { Link } from 'react-router-dom';
import css from '../HomePage/HomePage.module.css';

const HomePage = () => {
  return (
    <main>
      <div className={css.wrapper}>
        <h1 className={css.title}>Find your perfect rental car</h1>
        <p className={css.text}>Reliable and budget-friendly rentals for any journey</p>
        <Link to='/catalog' className={css.btn}>View Catalog</Link>
      </div>
    </main>
  );
};

export default HomePage;