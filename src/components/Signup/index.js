import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Input from "../BasicComponents/Input";
import Button from "../BasicComponents/Button";
import styles from "./styles.module.css";

export default function Signup() {
  const [signupData, setSignupData] = useState({
    email: "",
    userName: "",
    password: "",
  });

  const [condition, setCondition] = useState({
    isRegistered: false,
    checkUser: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignupData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const submitData = (event) => {
    event.preventDefault();
    const data = {
      email: signupData.email,
      userName: signupData.userName,
      password: signupData.password,
    };
    const xhr = new XMLHttpRequest();
    xhr.open("post", "https://thawing-hollows-23492.herokuapp.com/signup");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("load", () => {
      console.log(xhr.responseText);
      const finalData = JSON.parse(xhr.responseText);
      setCondition((prevValue) => {
        return {
          ...prevValue,
          isRegistered: finalData.userExisted,
          checkUser: finalData.already,
        };
      });
    });
    xhr.send(JSON.stringify(data));
  };

  return (
    <>
      <section id="signup">
        <div className={styles.page_container}>
          <div className={styles.wrapper}>
            <form onSubmit={submitData}>
              <Input
                onChange={handleChange}
                name="email"
                value={signupData.email}
                placeholder="Your Email"
                type="email"
              />
              <br />
              <Input
                onChange={handleChange}
                name="userName"
                value={signupData.userName}
                placeholder="Your Fullname"
                type="text"
              />
              <br />
              <Input
                onChange={handleChange}
                name="password"
                value={signupData.password}
                placeholder="Your Password"
                type="password"
              />
              <br />
              {condition.checkUser ? (
                <p className={styles.msg}>User already registered.</p>
              ) : null}
              <Button type="submit" innerHTML="Sign Up" />
            </form>
            <p className={styles.p}>
              <Link className={styles.links} to="/login">
                Have an Account?<h4 className={styles.login}>Login</h4>
              </Link>
            </p>
          </div>
        </div>
        {condition.isRegistered
          ? localStorage.setItem("email", signupData.email)
          : null}
        {condition.isRegistered ? <Navigate to="/home" /> : null}
      </section>
    </>
  );
}
