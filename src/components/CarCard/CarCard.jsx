import { Link } from "react-router-dom";
import css from './CarCard.module.css'

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

  return (
      <li className={css.item}>
        <div>
          <img className={css.carImage} src={img} alt={`${brand} ${model}`} loading="lazy" />
        </div>

        <div className={css.cardTitle}>
          <h3 className={css.carTitle}>
            {brand} <span className={css.model}>{model}</span>, {year}
          </h3>
          <span className={css.carPrice}>${rentalPrice}</span>
        </div>

        {address}, {rentalCompany}, {type}, {mileage}

        <Link to={`/catalog/${id}`} className={css.btn}>Read more</Link>
      </li>
  );
};

export default CarCard;
