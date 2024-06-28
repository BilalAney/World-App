/** @format */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SpinnerFullPage from "./components/SpinnerFullPage";
import CityList from "./components/CityList";
import { Suspense, lazy } from "react";
import CountriesList from "./components/CountriesList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  return (
    <div className="App">
      <CitiesProvider>
        <AuthProvider>
          <Suspense fallback={<SpinnerFullPage />}>
            <BrowserRouter>
              <Routes>
                <Route path="product" element={<Product />} />

                <Route path="/" element={<Homepage />} />

                <Route path="pricing" element={<Pricing />} />

                <Route path="login" element={<Login />} />

                <Route path="app" element={<AppLayout />}>
                  {/* <Route index element={<CityList />} /> */}
                  <Route path="cities" element={<CityList />} />
                  <Route path="cities/:id" element={<City />} />
                  <Route path="countries" element={<CountriesList />} />
                  <Route path="form" element={<Form />} />
                </Route>

                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </BrowserRouter>
          </Suspense>
        </AuthProvider>
      </CitiesProvider>
    </div>
  );
}

export default App;
