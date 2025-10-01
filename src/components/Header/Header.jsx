import { NavLink } from 'react-router-dom';
import { buildLinkClass } from '../../helpers/buildLinkClass.js';
import css from './Header.module.css';
import logo from '../../assets/logo.png'

export const Header = () => {
  return (
    <header className={css.header}>
      <NavLink to="/">
        <img src={logo} alt="Car Rental Logo" className={css.logo} />
      </NavLink>

      <nav className={css.nav}>
        <NavLink className={buildLinkClass} to="/" end>
          Home
        </NavLink>
        <NavLink className={buildLinkClass} to="/catalog" end>
          Catalog
        </NavLink>
      </nav>
    </header>
  );
};
