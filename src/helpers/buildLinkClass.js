import clsx from 'clsx';
import css from './common.module.css'

export const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };