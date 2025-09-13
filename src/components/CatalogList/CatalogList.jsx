import { useEffect, useState } from 'react';
import { fetchCars } from '../../services/api.js';
import CarCard from '../CarCard/CarCard.jsx';
import css from './CatalogList.module.css'

const CatalogList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchCars();
      setCars(data);
    };
    getData();
  }, []);

  return (
    <ul className={css.list}>
      {cars.map(car => (
        <CarCard key={car.id} car={car} />
      ))}
    </ul>
  );
};

export default CatalogList;
