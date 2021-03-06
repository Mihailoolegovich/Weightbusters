import { NavLink } from 'react-router-dom';
import { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './BurgerMenu.module.scss';
import routes from '../../routes';
import PropTypes from 'prop-types';

const BurgerMenu = ({ isActive, onCloseBurger }) => {
  const navLinks = useMemo(() => routes.filter(route => route.isNav), []);

  return (
    <div
      className={
        isActive
          ? `${styles.burgerMenu} ${styles.active}`
          : `${styles.burgerMenu}`
      }
    >
      {navLinks.map(link => (
        <NavLink
          key={uuidv4()}
          to={link.path}
          exact="true"
          className={({ isActive }) =>
            isActive
              ? `${styles.link} + ' '  ${styles.activeLink}`
              : styles.link
          }
          onClick={onCloseBurger}
        >
          {link.label}
        </NavLink>
      ))}
    </div>
  );
};

export default BurgerMenu;

BurgerMenu.propTypes = {
  isActive: PropTypes.bool,
  onCloseBurger: PropTypes.func,
};
