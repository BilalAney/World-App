/** @format */

import { useNavigate } from "react-router-dom";
import NavigationList from "../components/NavigationList";
import { useAuthContext } from "../contexts/FakeAuthContext";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const { login, isAuth } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) navigate("/App", { replace: true });
  }, [isAuth, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    login(email, password);
  }

  return (
    <main className={styles.login}>
      <NavigationList />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button onClick={handleSubmit}>Login</button>
        </div>
      </form>
    </main>
  );
}
