import Title from "../component/Title";
import styled from "styled-components";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";
import { handleSignUp } from "../api";
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

const Register = () => {
  const navigate = useNavigate();

  const navigateToSignIn = () => {
    navigate("/");
  };

  const [newName, setNewName] = useState("");
  const [newPswd, setNewPswd] = useState("");

  const signUp = async() => {
    let returnMsg = await handleSignUp({ newName, newPswd });
    //console.log('return msg: ', returnMsg);
    if (returnMsg.message === 'success') {
      navigateToSignIn();
    } else if (returnMsg.message === "existed") {
      alert("Username already existed Q^Q")
    } else {
      alert("Something is wrong :(");
    }
  }

  return (
    <Wrapper>
      <Title />
      <div className="container" style={{ width: "30%" }}>
        <h1>Sign Up</h1>
        <p>Please fill in this form to create an account.</p>
        <hr />
        <label htmlFor="username">
          <b>Username</b>
        </label>
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          required
          onChange={(e) => setNewName(e.target.value)}
        />

        <label htmlFor="psw">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          required
          onChange={(e) => setNewPswd(e.target.value)}
        />

        <label htmlFor="psw-repeat">
          <b>Repeat Password</b>
        </label>
        <input
          type="password"
          placeholder="Repeat Password"
          name="psw-repeat"
          required
          // onChange={(e) => {
          //   if (e.target.value !== newPswd) {
          //     console.log('former :', newPswd, 'latter :', e.target.value);
          //     alert("Error: Please make sure your password matchs.")
          //   }
          // }}
        />

        <div className="clearfix" style={{ marginTop: "20px" }}>
          <button
            type="button"
            onClick={() => navigateToSignIn()}
            className="cancelbtn"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="signupbtn"
            onClick={signUp}
          >
            Sign Up
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Register;
