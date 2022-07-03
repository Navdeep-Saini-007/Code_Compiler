import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Input from "../BasicComponents/Input";
import Button from "../BasicComponents/Button";
import styles from "./styles.module.css";

export default function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const [condition, setCondition] = useState({
    checkUser: false,
    checkPassword: true,
    isRegistered: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const submitData = (event) => {
    event.preventDefault();
    const data = {
      email: loginData.email,
      password: loginData.password,
    };

    const xhr = new XMLHttpRequest();
    xhr.open("post", "https://thawing-hollows-23492.herokuapp.com/login");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("load", () => {
      console.log(xhr.responseText);
      const finalData = JSON.parse(xhr.responseText);
      setCondition((prevValue) => {
        return {
          ...prevValue,
          checkPassword: finalData.wrongPass,
          checkUser: finalData.notUser,
          isRegistered: finalData.userExisted,
        };
      });
    });
    xhr.send(JSON.stringify(data));
  };

  return (
    <>
      <section id="login">
        <div className={styles.page_container}>
          <div className={styles.wrapper}>
            <form onSubmit={submitData}>
              <Input
                onChange={handleChange}
                name="email"
                value={loginData.email}
                placeholder="Your Email"
                type="email"
              />
              <br />
              <Input
                onChange={handleChange}
                name="password"
                value={loginData.password}
                placeholder="Your Password"
                type="password"
              />
              <br />
              {condition.checkPassword ? null : (
                <p className={styles.msg}>
                  Your password is incorrect. Please check it again.
                </p>
              )}
              {condition.checkUser ? (
                <p className={styles.msg}>User not registered.</p>
              ) : null}
              <Button type="submit" innerHTML="Login" />
            </form>
            <Link className={styles.links} to="/forgotpassword">
              Forgot Password
            </Link>
            <p className={styles.p}>
              Don't have an Account?
              <Link className={styles.links} to="/signup">
                <h4 className={styles.signup}>Sign Up</h4>
              </Link>
            </p>
          </div>
        </div>
        {condition.isRegistered
          ? localStorage.setItem("email", loginData.email)
          : null}
        {condition.isRegistered ? <Navigate to="/home" /> : null}
      </section>
    </>
  );
}
