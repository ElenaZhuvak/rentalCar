import axios from 'axios';

axios.defaults.baseURL = 'https://car-rental-api.goit.global';

export async function fetchCars({
  page = 1,
  limit = 12,
  brand,
  price,
  minMileage,
  maxMileage,
} = {}) {
  const params = { page, limit };
  if (brand) params.brand = brand;

  if (price !== '' && price != null) {
    if (!Number.isNaN(price)) {
      params.rentalPrice = Number(price);
    }
  }

  if (minMileage !== '' && minMileage != null)
    params.minMileage = Number(minMileage);
  if (maxMileage !== '' && maxMileage != null)
    params.maxMileage = Number(maxMileage);

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
