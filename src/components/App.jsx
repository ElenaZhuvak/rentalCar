// import carHero from './assets/hero-img.jpg' 

import { Header } from './Header/Header.jsx';
import css from './App.module.css'
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage.jsx';
import Catalog from '../pages/12/12.jsx';
import { Suspense } from 'react';
import CarDetailsPage from '../pages/CarDetailsPage/CarDetailsPage.jsx';

const App = () => {
  return (
    <div className={css.container}>
      <Header />

      <Suspense fallback={<h3>Loading...</h3>}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/catalog' element={<Catalog />} />
          <Route path='/catalog/:id' element={<CarDetailsPage />}  />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;