import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Login.css";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Clickhere from "../components/Clickhere";

function Signup() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:9000/api/registration", {
        username: data.username,
        email: data.email,
        password: data.password,
        confirmpassword: data.confirmpassword,
      })
      .then((res) => {
        console.log(res.data);
      });
  };
  const handle = (e) => {
    const newDetails = { ...data };
    newDetails[e.target.id] = e.target.value;
    setData(newDetails);
  };
  const style = {
    backgroundColor: "black",
    color: "white",
    padding: "10px",
    width: "100px",
    marginTop: "10px",
    border: "none",
    borderRadius: "5px",
  };
  return (
    <>
      <div className="main">
        <div className="background">
          <div className="left">
            <div className="div1"></div>
            <div className="div3"></div>
          </div>
          <div className="right">
            <div className="div2"></div>
            <div className="div4"></div>
          </div>

          <div className="frontground">
            <div className="photo">
              <img
                className="loginImage"
                src="https://media.istockphoto.com/photos/you-can-log-into-your-account-worldwide-picture-id501550413"
              />
            </div>

            <form className="signupform" onSubmit={(e) => submit(e)}>
              <h3>SIGN UP FORM</h3>
              <label>Enter your username</label>
              <input
                id="username"
                onChange={(e) => handle(e)}
                value={data.username}
                type="text"
                placeholder="enter username"
                required
              />
              <label>Enter your email</label>
              <input
                id="email"
                onChange={(e) => handle(e)}
                value={data.email}
                type="text"
                placeholder="enter email"
                required
              />
              <label>Enter your password</label>
              <input
                id="password"
                onChange={(e) => handle(e)}
                value={data.password}
                type="text"
                placeholder="enter password"
                required
              />
              <label>Confirm your password</label>
              <input
                id="confirmpassword"
                onChange={(e) => handle(e)}
                value={data.confirmpassword}
                type="text"
                placeholder="confirm password"
                required
              />
              <Button text="SIGN UP" style={style} />{" "}
              <Clickhere text="log in" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
