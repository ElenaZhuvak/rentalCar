import { NavLink } from "react-router-dom"
import { buildLinkClass } from "../../helpers/buildLinkClass.js"
import css from './Header.module.css'
import Logo from "../Logo/Logo.jsx"


export const Header = () => {
  return (
    <header className={css.header}>
        <Logo />
        <nav className={css.nav}>
            <NavLink className={buildLinkClass} to='/'>Home</NavLink>
            <NavLink className={buildLinkClass} to='/catalog'>Catalog</NavLink>
        </nav>
    </header>
  )
}
