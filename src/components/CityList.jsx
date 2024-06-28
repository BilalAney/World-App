/** @format */
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCitiesContext } from "../contexts/CitiesContext";
export default function CityList() {
  const { cities, status } = useCitiesContext();
  if (cities.length === 0)
    return (
      <Message message="Add  your first city by clicking the city in the map" />
    );
  return (
    <ul className={styles.cityList}>
      {status === "loading" ? (
        <Spinner />
      ) : (
        cities.map((ele) => <CityItem city={ele} />)
      )}
    </ul>
  );
}
