import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick, disabled, isLoading }) => {
  return (
    <button
      className={css.btn}
      type='button'
      onClick={onClick}
      disabled={disabled}
      style={{cursor: disabled ? 'not-allowed' : 'pointer'}}
    >
      {isLoading ? 'Loading...' : 'Load More'}
    </button>
  );
};

export default LoadMoreBtn;
