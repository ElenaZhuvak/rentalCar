import axios from 'axios';

axios.defaults.baseURL = 'https://car-rental-api.goit.global';

export async function fetchCars({
  page = 1,
  limit = 12,
  brand,
  price,
  mileageFrom,
  mileageTo,
} = {}) {
  const params = { page, limit };
  if (brand) params.brand = brand;

  if (price !== '' && price != null) params.price = Number(price);
  if (mileageFrom !== '' && mileageFrom != null) params.mileageFrom = Number(mileageFrom);
  if (mileageTo !== '' && mileageTo != null) params.mileageTo = Number(mileageTo);

  const { data } = await axios.get('/cars', { params });
  return data;
}

export async function fetchCarById(id) {
  const { data } = await axios.get(`/cars/${id}`);
  return data;
}

export async function fetchBrands() {
  const { data } = await axios.get('/brands');
  return data;
}
