import { Link } from 'react-router-dom';
import css from './CarCard.module.css';
import {
  parseCityCountry,
  formatMileage,
  formatCarType,
} from '../../helpers/carFormat';

const CarCard = ({ car }) => {
  const {
    id,
    brand,
    model,
    year,
    img,
    rentalPrice,
    address,
    rentalCompany,
    type,
    mileage,
  } = car;

  const { city, country } = parseCityCountry(address);
  const mileageFormatted = formatMileage(mileage);
  const typeLabel = formatCarType(type);

  return (
    <li className={css.item}>
      <img
        className={css.carImage}
        src={img}
        alt={`${brand} ${model}`}
        loading="lazy"
      />

      <div className={css.cardBody}>
        <div className={css.cardTitle}>
          <h3 className={css.carTitle}>
            {brand} <span className={css.model}>{model}</span>, {year}
          </h3>
          <span className={css.carPrice}>${rentalPrice}</span>
        </div>

        <div className={css.cardFormat}>
          <div className={css.text}>
            <span>{city}</span>
            <span>{country}</span>
            <span>{rentalCompany}</span>
          </div>

          <div className={css.text}>
            <span>{typeLabel}</span>
            <span>{mileageFormatted} km</span>
          </div>
        </div>
      </div>

      <Link to={`/catalog/${id}`} className={css.btn}>
        Read more
      </Link>
    </li>
  );
};

export default CarCard;
