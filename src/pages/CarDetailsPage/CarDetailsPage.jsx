import { useEffect, useState } from 'react';
import { fetchCarById } from '../../services/api.js';
import { useParams } from 'react-router-dom';
import css from './CarDetailsPage.module.css';
import { BarLoader } from 'react-spinners';
import BookingForm from '../../components/BookingForm/BookingForm.jsx';
import SPRITE from '../../assets/symbol-defs.svg';
import { formatMileage, parseCityCountry } from '../../utils/carFormat.js';

const CarDetailsPage = () => {
  const [carDetails, setCarDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const carById = await fetchCarById(id);
        setCarDetails(carById);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [id]);

  if (isLoading) {
    return (
      <div className={css.loaderContainer}>
        <BarLoader className={css.loader} />
      </div>
    );
  }

  if (error) {
    return <div className={css.error}>Error: {error}</div>;
  }

  if (!carDetails) {
    return <div className={css.error}>No car details available.</div>;
  }

  const {
    brand,
    model,
    year,
    img,
    description,
    mileage,
    rentalPrice,
    address,
    rentalConditions,
    type,
    fuelConsumption,
    engineSize,
    accessories,
    functionalities,
  } = carDetails;

  const { city, country } = parseCityCountry(address);
  const location = [city, country].filter(Boolean).join(', ');

  const imgId = img.match(/\d{4}(?=-)/)?.[0] || 'N/A';
  const mileageFormatted = formatMileage(mileage);

  return (
    <main>
      <div className={css.carDetailsContainer}>
        <div className={css.carFormDetails}>
          <img className={css.carImageDetails} src={img} alt={description} />
  
          <BookingForm />
        </div>
  
        <article className={css.car}>
          <header className={css.headerCarDetails}>
            <div className={css.titleWrapper}>
              <h2 className={css.title}>
                {brand} {model}, {year}
              </h2>
  
              <span className={css.id}>Id: {imgId}</span>
            </div>
  
            <p className={css.meta}>
              <span className={css.location}>
                <svg
                  className={css.icon}
                  aria-hidden="true"
                  focusable="false"
                  width="16"
                  height="16"
                >
                  <use href={`${SPRITE}#icon-location`}></use>
                </svg>
                {location}
              </span>
  
              <span className={css.mileage}>Mileage: {mileageFormatted} km</span>
            </p>
  
            <p className={css.price}>${rentalPrice}</p>
  
            <p className={css.desc}>{description}</p>
          </header>
  
          <div className={css.divider}>
            <section
              aria-labelledby="rental-conditions"
              className={css.rentalConditionBox}
            >
              <h3 id="rental-conditions">Rental Conditions:</h3>
              <ul className={css.checklist}>
                {rentalConditions.map((condition, index) => (
                  <li key={index} className={css.item}>
                    <svg
                      className={css.icon}
                      aria-hidden="true"
                      focusable="false"
                      width="16"
                      height="16"
                    >
                      <use href={`${SPRITE}#icon-check-circle`}></use>
                    </svg>
                    {condition}
                  </li>
                ))}
              </ul>
            </section>
    
            <section aria-labelledby="car-specs" className={css.carSpecs}>
              <h3 id="car-specs">Car Specifications</h3>
              <dl className={css.specs}>
                <div className={css.specItem}>
                  <svg
                    className={css.icon}
                    aria-hidden="true"
                    focusable="false"
                    width="16"
                    height="16"
                  >
                    <use href={`${SPRITE}#icon-calendar`}></use>
                  </svg>
                  <dt>Year: </dt>
                  <dd>{year}</dd>
                </div>
                <div className={css.specItem}>
                  <svg
                    className={css.icon}
                    aria-hidden="true"
                    focusable="false"
                    width="16"
                    height="16"
                  >
                    <use href={`${SPRITE}#icon-car`}></use>
                  </svg>
                  <dt>Type: </dt>
                  <dd>{type}</dd>
                </div>
                <div className={css.specItem}>
                  <svg
                    className={css.icon}
                    aria-hidden="true"
                    focusable="false"
                    width="16"
                    height="16"
                  >
                    <use href={`${SPRITE}#icon-fuel-pump`}></use>
                  </svg>
                  <dt>Fuel Consumption: </dt>
                  <dd>{fuelConsumption}</dd>
                </div>
                <div className={css.specItem}>
                  <svg
                    className={css.icon}
                    aria-hidden="true"
                    focusable="false"
                    width="16"
                    height="16"
                  >
                    <use href={`${SPRITE}#icon-gear`}></use>
                  </svg>
                  <dt>Engine Size: </dt>
                  <dd>{engineSize}</dd>
                </div>
              </dl>
            </section>
    
            <section aria-labelledby="car-features">
              <h3 id="car-features">Accessories and functionalities:</h3>
              <ul className={css.checklist}>
                {accessories.map((accessory, index) => (
                  <li key={index} className={css.item}>
                    <svg
                      className={css.icon}
                      aria-hidden="true"
                      focusable="false"
                      width="16"
                      height="16"
                    >
                      <use href={`${SPRITE}#icon-check-circle`}></use>
                    </svg>
                    {accessory}
                  </li>
                ))}
                {functionalities.map((functionality, index) => (
                  <li key={index} className={css.item}>
                    <svg
                      className={css.icon}
                      aria-hidden="true"
                      focusable="false"
                      width="16"
                      height="16"
                    >
                      <use href={`${SPRITE}#icon-check-circle`}></use>
                    </svg>
                    {functionality}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
};

export default CarDetailsPage;
