/** @format */

import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";

export default function NavigationList() {
  return (
    <nav className={styles.nav}>
      <NavLink to="/">
        <Logo />
      </NavLink>
      <ul>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            LOGIN
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
