import React, { useState } from "react";
import Input from "../BasicComponents/Input";
import Button from "../BasicComponents/Button";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export default function ForgotPassword() {
  const [forgotPage, setForgotpage] = useState({
    email: "",
    password: "",
    storeEmail: "",
  });

  const [condition, setCondition] = useState({
    change: false,
    ack: false,
    checkEmail: true,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setForgotpage((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
        storeEmail: "",
      };
    });
  }

  function handlepasswordChange(event) {
    const { name, value } = event.target;
    setForgotpage((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function submit(event) {
    event.preventDefault();
    console.log(forgotPage);
    fetch("https://thawing-hollows-23492.herokuapp.com/forgot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(forgotPage),
    })
      .then((response) => {
        if (!response.ok) {
          console.log("err");
          console.log(response);
        }
        return response.json();
      })
      .then((serverResponse) => {
        console.log(serverResponse);
        setCondition((prevValue) => {
          return {
            ...prevValue,
            change: serverResponse.user,
            checkEmail: serverResponse.user,
          };
        });
        setForgotpage({
          email: "",
          password: "",
          storeEmail: serverResponse.serverEmail,
        });
      });
  }

  function passwordSubmit(event) {
    event.preventDefault();
    console.log(forgotPage);
    fetch("https://thawing-hollows-23492.herokuapp.com/newPassword", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(forgotPage),
    })
      .then((response) => {
        if (!response.ok) {
          console.log("err");
          console.log(response);
        }
        return response.json();
      })
      .then((serverResponse) => {
        console.log(serverResponse);
        setCondition((prevValue) => {
          return {
            ...prevValue,
            ack: serverResponse.done,
          };
        });
      });
  }

  return (
    <>
      <div className={styles.page_container}>
        <div className={styles.wrapper}>
          <h1>Forgot Password</h1>
          <p className={styles.center}>
            Enter your registered email address here
          </p>
          {condition.change ? null : (
            <form className={styles.form} onSubmit={submit}>
              <Input
                name="email"
                onChange={handleChange}
                value={forgotPage.email}
                type="email"
                placeholder="Your Email"
              />
              {condition.checkEmail ? null : (
                <p
                  style={{
                    color: "red",
                    textAlign: "center",
                    marginBottom: "1.5rem",
                  }}
                >
                  This email was not registered.
                </p>
              )}
              <Button type="submit" innerHTML="Submit" />
            </form>
          )}
          {condition.change ? (
            <form className={styles.form} onSubmit={passwordSubmit}>
              <input
                defaultValue={forgotPage.storeEmail}
                readOnly
                className={styles.input}
              />
              <Input
                name="password"
                value={forgotPage.password}
                onChange={handlepasswordChange}
                type="password"
                placeholder="Enter New Password"
                required
              />
              {condition.ack ? (
                <p
                  style={{
                    color: "green",
                    textAlign: "center",
                    marginBottom: "1.5rem",
                  }}
                >
                  Your password was changed. Please login.
                </p>
              ) : null}
              <Button type="submit" innerHTML="Submit" />
            </form>
          ) : null}
          <Link className={styles.links} to="/login">
            Back To Login
          </Link>
        </div>
      </div>
    </>
  );
}
