import axios from 'axios';

axios.defaults.baseURL = 'https://car-rental-api.goit.global';

export async function fetchCars({ page = 1, limit = 12 } = {}) {
  const { data } = await axios.get('/cars', { params: { page, limit } });
  return data;
}

export async function fetchCarById(id) {
  const { data } = await axios.get(`/cars/${id}`);
  return data;
}
