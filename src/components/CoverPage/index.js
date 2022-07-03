import React from "react";
import styles from "./styles.module.css";
import Navbar from "../BasicComponents/Navbar";
import C from "../BasicComponents/C";
import CPP from "../BasicComponents/CPP";
import Java from "../BasicComponents/Java";
import Python from "../BasicComponents/Python";
import JavaScript from "../BasicComponents/JavaScript";
import Node from "../BasicComponents/Node";
import img from "./final.png";

export default function CoverPage() {
  return (
    <>
      <section id="coverPage" className="page-container">
        <Navbar />
        <div className={styles.coverPage}>
          <div className={styles.first_container}>
            <div className={styles.left_container}>
              <h1 className={styles.heading}>
                Write and run code online in several languages.
              </h1>
              <h4 className={styles.subheading}>
                Code-Compiler is a free online compiler. It helps users to write
                and run code in serveral languages including all popular ones
                like C, C++, Python, Java, JavaScript and user can save their
                files in the dashboard.
              </h4>
            </div>
            <div className={styles.right_container}>
              <img src={img} className={styles.img} alt="anything" />
            </div>
          </div>
          <div className={styles.second_container}>
            <h1 className={styles.second_heading}>
              Write Code in popular languages such as:{" "}
            </h1>
            <div className={styles.control}>
              <div className={styles.icon}>
                <C />
              </div>
              <div className={styles.icon}>
                <CPP />
              </div>
              <div className={styles.icon}>
                <Java />
              </div>
              <div className={styles.icon}>
                <Python />
              </div>
              <div className={styles.icon}>
                <JavaScript />
              </div>
              <div className={styles.icon}>
                <Node />
              </div>
            </div>
          </div>
          {/* <div className={styles.footer}>© 2022</div> */}
        </div>
      </section>
    </>
  );
}
