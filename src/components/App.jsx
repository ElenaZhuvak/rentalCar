// import carHero from './assets/hero-img.jpg' 

import { Header } from './Header/Header.jsx';
import css from './App.module.css'

const App = () => {
  return (
    <div className={css.container}>
      <Header />
    </div>
  );
};

export default App;