import { useEffect, useState } from 'react';
import { fetchCars } from '../../services/api.js';
import CarCard from '../CarCard/CarCard.jsx';
import css from './CatalogList.module.css';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn.jsx';

const LIMIT = 12;

const CatalogList = () => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const hasMore = page < totalPages;

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCars({ page: 1, limit: LIMIT });
        setCars(data.cars);
        setPage(1);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Failed to loaf cars', error);
        setCars([]);
        setPage(1);
        setTotalPages(1);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  const handleLoadMore = async () => {
    if (isLoading || page >=totalPages) return;

    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const data = await fetchCars({ page: nextPage, limit: LIMIT });
      setCars(prev => [...prev, ...(data.cars ?? [])]);
      setPage(nextPage);
      setTotalPages(data.totalPages ?? totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };


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
  );
};

export default CatalogList;
