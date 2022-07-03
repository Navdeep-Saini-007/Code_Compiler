import React from "react";
import styles from "./styles.module.css";

export default function Button(props) {
  return (
    <button className={styles.button} type={props.type}>
      {props.innerHTML}
    </button>
  );
}
