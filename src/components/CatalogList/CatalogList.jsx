import { useEffect} from 'react';
import CarCard from '../CarCard/CarCard.jsx';
import css from './CatalogList.module.css';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectCars, selectCarsLoading, selectCarsPage, selectCarsTotalPages } from '../../redux/cars/carsSelectors.js';
import { fetchCarsThunk, fetchMoreCarsThunk } from '../../redux/cars/carsOperations.js';

const CatalogList = () => {
  const dispatch = useDispatch();

  const cars = useSelector(selectCars);
  const isLoading = useSelector(selectCarsLoading);
  const page = useSelector(selectCarsPage);
  const totalPages = useSelector(selectCarsTotalPages);

  const hasMore = page < totalPages;


  useEffect(() => {
      dispatch(fetchCarsThunk());
  }, [dispatch]);
  

  const handleLoadMore = async () => {
  if (!isLoading && hasMore) {
    dispatch(fetchMoreCarsThunk());
  };
  }

  return (
    <>
      <ul className={css.list}>
        {cars.map(car => (
          <CarCard key={car.id} car={car} />
        ))}
      </ul>

      {cars.length > 0 && hasMore && 
      (<LoadMoreBtn onClick={handleLoadMore} disabled={isLoading} isLoading={isLoading} />)}
    </>
  )
};

export default CatalogList;