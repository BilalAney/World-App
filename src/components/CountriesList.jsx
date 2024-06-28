/** @format */
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";

import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCitiesContext } from "../contexts/CitiesContext";
export default function CountriesList() {
  const { cities, status } = useCitiesContext();
  const countries = cities?.reduce((acc, cur) => {
    return acc.includes(cur.country) ? acc : [...acc, cur.country];
  }, []);

  if (cities.length === 0)
    return (
      <Message message="Add  your first city by clicking the city in the map" />
    );
  return (
    <ul className={styles.countryList}>
      {status === "loading" ? (
        <Spinner />
      ) : (
        countries.map((ele) => <CountryItem country={ele} />)
      )}
    </ul>
  );
}
