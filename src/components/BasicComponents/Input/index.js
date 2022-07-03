import React from "react";
import styles from "./styles.module.css";

export default function Input(props) {
  return (
    <input
      className={styles.input}
      onChange={props.onChange}
      name={props.name}
      value={props.value}
      placeholder={props.placeholder}
      type={props.type}
      required
    />
  );
}
