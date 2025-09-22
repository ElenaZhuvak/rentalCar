import { Link } from 'react-router-dom';
import css from './CarCard.module.css';
import {
  parseCityCountry,
  formatMileage,
  formatCarType,
} from '../../utils/carFormat';
import SPRITE from '../../assets/symbol-defs.svg';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../redux/favourite/favouritesSlice.js';
import { selectFavoritesIds } from '../../redux/favourite/favouritesSelector.js';

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

  const dispatch = useDispatch();
  const favorites = useSelector(selectFavoritesIds);
  const isFavorite = favorites.includes(id);

const toggleFavorite = () => {
  if (isFavorite) {
    dispatch(removeFromFavorites(id));
  } else {
    dispatch(addToFavorites(id));
  }
}

  const { city, country } = parseCityCountry(address);
  const mileageFormatted = formatMileage(mileage);
  const typeLabel = formatCarType(type);


  return (
    <li className={css.item}>

      <div className={css.favorite}>
          <button
            className={`${css.btnHeart} ${isFavorite ? css.active : ''}`}
            onClick ={toggleFavorite}
            type="button">
            <svg className ={css.icon} width="16" height="16" aria-hidden="true">
              <use href={`${SPRITE}#${isFavorite ? 'icon-heart-filled' : 'icon-heart'}`} />
            </svg>
          </button>
      </div>

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
