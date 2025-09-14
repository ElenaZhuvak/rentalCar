import { useEffect, useState } from "react";
import { fetchCarById } from "../../services/api.js";
import { useParams } from "react-router-dom";
import css from './CarDetailsPage.module.css'

const CarDetailsPage = () => {
    const [carDetails, setCarDetails] = useState(null)
    const {id} = useParams();

    useEffect(() => {
      const getData = async () => {
        const carById = await fetchCarById(id);
        setCarDetails(carById);
      }
      getData();
    }, [id])
    
    if (!carDetails) return <h3>Loading...</h3>

  return (
    <div className={css.CarDetailsContainer}>
        <img className={css.carImage} src={carDetails.img} alt={carDetails.description} />

        
    </div>
  );
};

export default CarDetailsPage;