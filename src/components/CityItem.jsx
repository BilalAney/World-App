/** @format */
import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCitiesContext } from "../contexts/CitiesContext";
export default function CityItem({ city }) {
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));
  const { currentCity, deleteCity } = useCitiesContext();

  function handleClick(e) {
    e.preventDefault();
    deleteCity(city.id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currentCity.id === city.id && styles["cityItem--active"]
        }`}
        to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
      >
        <span className={styles.emoji}>{city.emoji}</span>
        <h3 className={styles.name}>{city.cityName}</h3>
        <time className={styles.data}>{formatDate(city.date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}
