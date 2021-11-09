import React, { useState } from "react";
import "./home.css";
import { useHistory } from "react-router-dom";
import { message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Button from "../Components/Buttons.jsx";
import pic from "../assets/loginDec.png";

const Login = () => {
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const spinIcon = <LoadingOutlined style={{ fontSize: 44 }} spin />;

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };
  const updatePwd = (e) => {
    setPwd(e.target.value);
  };

  const loginNow = () => {
    setLoginStatus(true);
    let data = {
      account: username,
      password: pwd,
    };
    console.log(data);
    fetch("http://127.0.0.1:8080/login", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.code && json.code === 200) {
          sessionStorage.setItem('user',json.user);
          history.push("/upload");
          return;
        }
        else {
          message.error('Login failed!')
        }
      })
      .catch((err) => message.error('Login failed! Something wrong with your network!'));
  };
  return (
    <div className={"mainContainerContent"}>
      <Spin
        spinning={loginStatus}
        indicator={spinIcon}
        size="large"
        color="red"
        style={{
          position: "absolute",
          bottom: "12vh",
          right: "12vw",
          color: "red",
        }}
      />
      <div id="decContainer" className={loginStatus ? "animation" : null}>
        <img id={"loginCard"} src={pic} alt={""} />
        <span id={"loginCardDec"} />
      </div>
      <h1
        style={{
          alignSelf: "flex-start",
          marginLeft: "19vw",
          marginBottom: "5vh",
        }}
      >
        LOGIN
      </h1>
      <h3 style={{ alignSelf: "flex-start", marginLeft: "19vw" }}> Username</h3>
      <input
        className={"inputLogin"}
        placeholder="USERNAME"
        onChange={(value) => updateUsername(value)}
      />
      <h3
        style={{
          alignSelf: "flex-start",
          marginLeft: "19vw",
          marginTop: "5vh",
        }}
      >
        Password
      </h3>
      <input
        type="password"
        className={"inputLogin"}
        placeholder="PASSWORD"
        onChange={(value) => updatePwd(value)}
      />
      <div style={{ width: "10rem", height: "3rem", marginTop: "5vh" }}>
        <Button
          id={"btn4_1"}
          onClick={() => loginNow()}
          content="Login"
          width={"10rem"}
          height={"3rem"}
        />
      </div>
    </div>
  );
};

export default Login;
