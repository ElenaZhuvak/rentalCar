
import css from './App.module.css'
import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Header } from './Header/Header.jsx';

const HomePage = lazy(() => import('../pages/HomePage/HomePage.jsx'));
const CatalogPage = lazy(() => import('../pages/CatalogPage/CatalogPage.jsx'));
const CarDetailsPage = lazy(() => import('../pages/CarDetailsPage/CarDetailsPage.jsx'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound.jsx'));

const App = () => {
  return (
    <div className={css.container}>
      <Header />

      <Suspense fallback={<h3>Loading...</h3>}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/catalog' element={<CatalogPage />} />
          <Route path='/catalog/:id' element={<CarDetailsPage />} />

          <Route path='*' element={<NotFound />}/>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;