import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick, disabled}) => {
  return (
    <button
      className={css.btn}
      type='button'
      onClick={onClick}
      disabled={disabled}
      style={{cursor: disabled ? 'not-allowed' : 'pointer'}}
    >
      Load more
    </button>
  );
};

export default LoadMoreBtn;
