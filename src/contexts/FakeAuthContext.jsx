/** @format */

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuth: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuth: true };
    case "logout":
      return { ...state, user: null, isAuth: false };
    default:
      throw new Error("The dispatch action type is not defined!");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuth }, dispatch] = useReducer(reducer, initialState);

  function login(email, password) {
    console.log("Login! -> ", email, password);
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext used outside the AuthProvider");
  return context;
}

export { AuthProvider, useAuthContext };
