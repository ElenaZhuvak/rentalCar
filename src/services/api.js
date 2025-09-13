import axios from "axios";

axios.defaults.baseURL = 'https://car-rental-api.goit.global';

export async function fetchCars() {
    const {data} = await axios.get('/cars');
    return data.cars
}

export async function fetchCarById(id) {
    const {data} = await axios.get(`/cars/${id}`);
    return data
}