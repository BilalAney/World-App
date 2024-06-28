/** @format */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

const context = createContext();

const initialState = {
  status: "",
  cities: [],
  currentCity: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "start_request":
      return { ...state, status: "loading" };
    case "successful_get_cities_request":
      return { ...state, status: "successful", cities: action.payload };
    case "request_failure":
      return { ...state, status: "fail" };
    case "successful_create":
      return {
        ...state,
        status: "successful",
        cities: [...state.cities, action.payload],
      };
    case "successful_delete":
      return {
        ...state,
        status: "successful",
        cities: state.cities.filter((ele) => ele.id !== action.payload),
      };
    case "successful_get_city_request":
      return { ...state, status: "successful", currentCity: action.payload };
    default:
      throw new Error("The dispatch action type is not defined!");
  }
}

function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [status, setStatus] = useState(null);
  // const [currentCity, setCurrentCity] = useState({});

  const [{ status, cities, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getData() {
      try {
        dispatch({ type: "start_request" });
        const res = await fetch("http://localhost:8000/cities");
        if (!res.ok) throw new Error("Error fetching the data");
        const data = await res.json();
        dispatch({ type: "successful_get_cities_request", payload: data });
      } catch (error) {
        dispatch({ type: "request_failure" });
      }
    }
    getData();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;
      try {
        dispatch({ type: "start_request" });
        const res = await fetch(`http://localhost:8000/cities/${id}`);
        if (!res.ok) throw new Error("Error fetching the city data");
        const data = await res.json();
        dispatch({ type: "successful_get_city_request", payload: data });
      } catch (error) {
        dispatch({ type: "request_failure" });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    try {
      dispatch({ type: "start_request" });
      const res = await fetch(`http://localhost:8000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (!res.ok) throw new Error("Error creating the city item");

      dispatch({ type: "successful_create", payload: data });
    } catch (error) {
      dispatch({ type: "request_failure" });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "start_request" });
      const res = await fetch(`http://localhost:8000/cities/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error deleting the city item");
      dispatch({ type: "successful_delete", payload: id });
    } catch (error) {
      dispatch({ type: "request_failure" });
    }
  }

  return (
    <context.Provider
      value={{
        cities,
        status,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </context.Provider>
  );
}

function useCitiesContext() {
  const values = useContext(context);
  if (!values) throw new Error("this hook called outside the CitiesProvider");
  return values;
}

export { CitiesProvider, useCitiesContext };
