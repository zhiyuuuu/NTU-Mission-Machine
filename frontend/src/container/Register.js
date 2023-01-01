import Title from "../component/Title";
import styled from "styled-components";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";

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
  return (
    <Wrapper>
      <Title />
      <div className="container">
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
        />

        <label htmlFor="psw">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          required
        />

        <label htmlFor="psw-repeat">
          <b>Repeat Password</b>
        </label>
        <input
          type="password"
          placeholder="Repeat Password"
          name="psw-repeat"
          required
        />

        <div className="clearfix">
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
            onClick={() => navigateToSignIn()}
          >
            Sign Up
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Register;
