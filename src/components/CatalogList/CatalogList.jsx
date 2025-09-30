import { useEffect, useState } from 'react';
import CarCard from '../CarCard/CarCard.jsx';
import css from './CatalogList.module.css';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCars,
  selectCarsLoading,
  selectCarsPage,
  selectCarsTotalPages,
} from '../../redux/cars/carsSelectors.js';
import {
  fetchCarsThunk,
  fetchMoreCarsThunk,
} from '../../redux/cars/carsOperations.js';
import { BarLoader } from 'react-spinners';
import { selectBrands } from '../../redux/brands/brandsSelector.js';

const CatalogList = () => {
  const dispatch = useDispatch();

  const [isMoreLoading, setIsMoreLoading] = useState(false);

  const cars = useSelector(selectCars);
  const isLoading = useSelector(selectCarsLoading);
  const page = useSelector(selectCarsPage);
  const totalPages = useSelector(selectCarsTotalPages);

  const { brand } = useSelector(selectBrands);

  const hasMore = totalPages > page;

  useEffect(() => {
    dispatch(fetchCarsThunk());
  }, [dispatch]);

  const handleLoadMore = async () => {
    if (!isMoreLoading && hasMore) {
      setIsMoreLoading(true);
      await dispatch(fetchMoreCarsThunk()).unwrap();
      setIsMoreLoading(false);
    }
  };

  const isAppending = cars.length > 0 && hasMore && (isLoading || isMoreLoading);

  return (
    <>
      {isLoading && cars.length === 0 && (
        <div className={css.loading}>
          <BarLoader className={css.loader} />
        </div>
      )}

      {isLoading && brand && cars.length === 0 && (
        <div className={css.noCarsBrand}>
          <p className={css.noCarsBrandText}>
            There are no cars of the brand {brand} available
          </p>
        </div>
      )}

      <ul className={css.list}>
        {cars.map(car => (
          <CarCard key={car.id} car={car} />
        ))}
      </ul>

      {cars.length > 0 && hasMore && !isAppending && (
      <LoadMoreBtn
        onClick={handleLoadMore}
        disabled={false}/>
    )}

    {isAppending && (
      <div className={css.loading}>
        <BarLoader className={css.loader} />
      </div>
    )}
    </>
  );
};

export default CatalogList;
