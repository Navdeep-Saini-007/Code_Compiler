import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export default function Dashboard() {
  const [array, setArray] = useState([]);

  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open("post", "https://thawing-hollows-23492.herokuapp.com/dashboard");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("load", () => {
      const response = JSON.parse(xhr.responseText).data.files;
      console.log(response);
      setArray([...response]);
    });
    xhr.send(JSON.stringify({ email: localStorage.getItem("email") }));
  }, []);

  const fileClicked = (event) => {
    const object = { clicked: true, id: event.target.id };
    console.log(object);
    localStorage.setItem("object", JSON.stringify(object));
  };

  return (
    <>
      <section id="dashboard">
        <div className={styles.page_container}>
          <div className={styles.header}>
            <Link to="/home" className={styles.brand}>
              <h2>Code-Compiler</h2>
            </Link>
            <div>
              <Link to="/home">
                <button className={`${styles.button} ${styles.left_button}`}>
                  Back To Playground
                </button>
              </Link>
              <Link to="/">
                <button className={styles.button}>Logout</button>
              </Link>
            </div>
          </div>
          <div className={styles.body}>
            {array.length ? (
              <div className={styles.heading}>
                <div>File Name</div>
                <div>Language</div>
                <div>Date Created</div>
                <div>Actions</div>
              </div>
            ) : (
              <h1>Your saved files will appear here.</h1>
            )}

            {array.map((item) => {
              return (
                <div key={item._id} className={styles.subheadings}>
                  <div>{item.fileName}</div>
                  <div>{item.language}</div>
                  <div>{item.date}</div>
                  <div>
                    <Link to="/home">
                      <button
                        className={styles.name}
                        id={item._id}
                        onClick={fileClicked}
                      >
                        {item.actions}
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
