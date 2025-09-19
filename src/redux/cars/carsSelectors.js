export const selectCars = state => state.cars.cars || [];
export const selectCarsPage = state => state.cars.page;
export const selectCarsTotalPages = state => state.cars.totalPages;
export const selectCarsLoading = state => state.cars.loading;
export const selectCarsError = state => state.cars.error;   