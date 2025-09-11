import css from '../HomePage/HomePage.module.css';

const HomePage = () => {
  return (
      <div className={css.wrapper}>
        <h1 className={css.title}>Find your perfect rental car</h1>
        <p className={css.text}>Reliable and budget-friendly rentals for any journey</p>
        <button className={css.btn}>View Catalog</button>
    </div>
  );
};

export default HomePage;