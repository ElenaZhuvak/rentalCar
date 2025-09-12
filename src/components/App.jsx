import { Header } from './Header/Header.jsx';
import css from './App.module.css'
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage.jsx';
import CatalogPage from '../pages/CatalogPage/CatalogPage.jsx'
import CarDetailsPage from '../pages/CarDetailsPage/CarDetailsPage.jsx';
import CarBrands from './CarBrands/CarBrands.jsx';
import NotFound from '../pages/NotFound/NotFound.jsx';
import { Suspense } from 'react';

const App = () => {
  return (
    <div className={css.container}>
      <Header />

      <Suspense fallback={<h3>Loading...</h3>}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/catalog' element={<CatalogPage />} />
          <Route path='/catalog/:id' element={<CarDetailsPage />} />
          <Route path='/brands' element={<CarBrands />} />

          <Route path='*' element={<NotFound />}/>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;