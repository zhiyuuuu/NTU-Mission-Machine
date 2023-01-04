import Title from "../component/Title";
import styled from "styled-components";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../api";
import { useState } from "react";

const Wrapper = styled.div`
  display: flex;
  margin-top: 2em;
  position: relative;
  width: 100%;
  overflow-y: auto;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  align-items: center;
`;

const Login = () => {
  const navigate = useNavigate();

  const navigateToSignUp = () => {
    navigate("/reg");
  };
  const navigateToMainPage = () => {
    navigate("/mainpage", {
      state: {
        username: username,
      },
    });
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginTest = async () => {
    let loginResult = await handleLogin({ username, password });

    if (loginResult.message === "success") {
      navigateToMainPage();
    } else {
      alert("Username or password is incorrect.");
    }
    setUsername("");
    setPassword("");
  };

  return (
    <Wrapper>
      <Title />
      <div className="container">
        <label>
          <b>Username</b>
        </label>
        <input
          type="text"
          placeholder="Enter Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <label>
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button onClick={loginTest}>Login</button>
        <button type="submit" onClick={() => navigateToSignUp()}>
          Register?
        </button>
      </div>
    </Wrapper>
  );
};

export default Login;
