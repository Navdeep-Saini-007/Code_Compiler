import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export default function Home() {
  const [data, setData] = useState({
    code: "",
    language: "c",
  });

  const [output, setOutput] = useState("Output:");

  const [condition, setCondition] = useState(true);

  const object = JSON.parse(localStorage.getItem("object"));
  console.log(object);

  const isGuest = JSON.parse(localStorage.getItem("Guest"));
  console.log(isGuest);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
    setCondition(true);
  };

  useEffect(() => {
    if (condition && !object.clicked) {
      console.log(data.language);

      fetch("https://thawing-hollows-23492.herokuapp.com/snippet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ language: data.language }),
      })
        .then((res) => {
          if (!res.ok) {
            console.log(res);
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setData((prevValue) => {
            return {
              ...prevValue,
              code: data,
            };
          });
        });
      // const xhr = new XMLHttpRequest();
      // xhr.open("post", "https://thawing-hollows-23492.herokuapp.com/snippet");
      // xhr.setRequestHeader("Content-type", "application/json");
      // xhr.addEventListener("load", () => {
      //   console.log(xhr.responseText);
      //   setData((prevValue) => {
      //     return {
      //       ...prevValue,
      //       code: xhr.responseText,
      //     };
      //   });
      // });
      // xhr.send(JSON.stringify({ language: data.language }));
    }
  }, [data.language]);

  useEffect(() => {
    if (object) {
      if (object.clicked) {
        const xhr = new XMLHttpRequest();
        xhr.open("post", "https://thawing-hollows-23492.herokuapp.com/getCode");
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.addEventListener("load", () => {
          console.log(xhr.responseText);
          const d = JSON.parse(xhr.responseText).files;
          let i;
          for (i = 0; i < d.length; i++) {
            if (d[i]._id === object.id) {
              object.clicked = false;
              localStorage.setItem("object", JSON.stringify(object));
              setCondition(false);
              let setCode = d[i].userCode;
              let lang = d[i].language;
              console.log(setCode);
              console.log(lang);
              let finalLang;
              if (lang === "C") {
                finalLang = "c";
              } else if (lang === "C++") {
                finalLang = "cpp17";
              } else if (lang === "Java") {
                finalLang = "java";
              } else if (lang === "Python") {
                finalLang = "python3";
              } else if (lang === "JavaScript") {
                finalLang = "nodejs";
              } else if (lang === "PHP") {
                finalLang = "php";
              } else if (lang === "Perl") {
                finalLang = "perl";
              } else if (lang === "Ruby") {
                finalLang = "ruby";
              } else if (lang === "Go") {
                finalLang = "go";
              } else if (lang === "Bash") {
                finalLang = "bash";
              } else if (lang === "SQL") {
                finalLang = "sql";
              } else if (lang === "Pascal") {
                finalLang = "pascal";
              } else if (lang === "C#") {
                finalLang = "csharp";
              } else if (lang === "VB.Net") {
                finalLang = "vbn";
              } else if (lang === "Haskell") {
                finalLang = "haskell";
              } else if (lang === "Objective C") {
                finalLang = "objc";
              } else if (lang === "Swift") {
                finalLang = "swift";
              } else if (lang === "Fortran") {
                finalLang = "fortran";
              } else if (lang === "Rust") {
                finalLang = "rust";
              } else if (lang === "R") {
                finalLang = "r";
              } else if (lang === "Prolog") {
                finalLang = "prolog";
              } else if (lang === "Rhino JS") {
                finalLang = "rhino";
              } else {
              }
              setData((prevValue) => {
                return {
                  ...prevValue,
                  language: finalLang,
                  code: setCode,
                };
              });
            }
          }
        });
        xhr.send(JSON.stringify({ id: object.id }));
      }
    }
  }, [object]);

  const submitData = (event) => {
    event.preventDefault();
    setOutput("Compiling.......");
    const xhr = new XMLHttpRequest();
    xhr.open("post", "https://thawing-hollows-23492.herokuapp.com/home");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("load", () => {
      console.log(xhr.responseText);
      const finalData = JSON.parse(xhr.responseText);
      setOutput(
        `Output: ${finalData.output}\nMemory Taken: ${finalData.memory}\nCPU Time: ${finalData.cpuTime}`
      );
    });
    xhr.send(JSON.stringify({ code: data.code, language: data.language }));
  };

  const saveFile = (event) => {
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dateObject = new Date();
    const date = dateObject.getDate();
    const Month = dateObject.getMonth();
    const Year = dateObject.getFullYear();
    const finalDate =
      month[Month] + " " + date.toString() + ", " + Year.toString();
    let fName = prompt("Please enter file name here without extension: ");
    while (fName === "") {
      alert("Please enter fileName without extension: ");
      fName = prompt("Please enter file name here without extension: ");
    }
    console.log(fName);
    if (fName !== null) {
      fetch("https://thawing-hollows-23492.herokuapp.com/saveFile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userCode: data.code,
          language: data.language,
          fileName: fName,
          date: finalDate,
          email: localStorage.getItem("email"),
        }),
      })
        .then((response) => {
          if (!response.ok) {
            console.log("error");
          }
          return response.json();
        })
        .then((serverResponse) => {
          console.log(serverResponse);
          if (serverResponse.ack) {
            alert("File saved Successfully.");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <section id="home">
        <div className={styles.page_container}>
          <form onSubmit={submitData}>
            <div className={styles.header}>
              <div className={isGuest ? styles.guest : styles.left_header}>
                <Link to="/home" className={styles.brand}>
                  <h2>Code-Compiler</h2>
                </Link>
                <div className={styles.options_container}>
                  <select
                    className={
                      isGuest ? styles.guest_dropdown : styles.dropdown
                    }
                    name="language"
                    onChange={handleChange}
                    value={data.language}
                  >
                    <option value="c">C</option>
                    <option value="cpp17">C++</option>
                    <option value="csharp">C#</option>
                    <option value="java">java</option>
                    <option value="python3">Python</option>
                    <option value="nodejs">JavaScript</option>
                    <option value="sql">SQL</option>
                    <option value="php">PHP</option>
                    <option value="perl">Perl</option>
                    <option value="ruby">Ruby</option>
                    <option value="go">Go</option>
                    <option value="bash">Bash</option>
                    <option value="pascal">Pascal</option>
                    <option value="vbn">VB.Net</option>
                    <option value="haskell">Haskell</option>
                    <option value="objc">Objective C</option>
                    <option value="swift">Swift</option>
                    <option value="fortran">Fortran</option>
                    <option value="rust">Rust</option>
                    <option value="r">R</option>
                    <option value="prolog">Prolog</option>
                    <option value="rhino">Rhino JS</option>
                  </select>
                  {isGuest ? null : (
                    <button className={styles.button} onClick={saveFile}>
                      Save
                    </button>
                  )}
                  <button className={styles.button} type="submit">
                    Run
                  </button>
                </div>
              </div>
              {isGuest ? null : (
                <div className={styles.right_header}>
                  <Link to="/dashboard" className={styles.link}>
                    <button
                      className={`${styles.button} ${styles.left_button}`}
                    >
                      Dashboard
                    </button>
                  </Link>
                  <Link to="/" className={styles.link}>
                    <button className={styles.button}>Logout</button>
                  </Link>
                </div>
              )}
            </div>
            <div className={styles.textArea_container}>
              <textarea
                placeholder="Write your code here:"
                spellCheck="false"
                className={styles.left_textArea}
                name="code"
                onChange={handleChange}
                value={data.code}
              ></textarea>
              <textarea
                readOnly
                name="output"
                className={styles.right_textArea}
                value={output}
              ></textarea>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
