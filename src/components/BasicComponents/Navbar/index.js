import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export default function Navbar() {
  const setGuest = () => {
    localStorage.setItem("Guest", true);
  };

  const setUser = () => {
    localStorage.setItem("Guest", false);
  };

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.brand}>Code-Compiler</h1>
        <div className={styles.login_signup_container}>
          <Link className={styles.links} to="/home">
            <button onClick={setGuest} className={styles.button}>
              Guest
            </button>
          </Link>
          <Link className={styles.links} to="/login">
            <button onClick={setUser} className={styles.button}>
              Login
            </button>
          </Link>
          <Link className={styles.links} to="/signup">
            <button onClick={setUser} className={styles.button}>
              Signup
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
