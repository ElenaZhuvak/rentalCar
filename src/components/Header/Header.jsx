import { NavLink } from "react-router-dom"
import { buildLinkClass } from "../../helpers/buildLinkClass.js"
import css from './Header.module.css'


export const Header = () => {
  return (
    <header className={css.header}>
        <svg className={css.logo}>
            <use xlinkHref='/src/assets/symbol-defs.svg#icon-logo'></use>
        </svg>

        <nav className={css.nav}>
            <NavLink className={buildLinkClass} to='/'>Home</NavLink>
            <NavLink className={buildLinkClass} to='/catalog'>Catalog</NavLink>
        </nav>
    </header>
  )
}
