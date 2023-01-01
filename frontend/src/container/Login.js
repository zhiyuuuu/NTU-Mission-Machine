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

const Login = () => {
  const navigate = useNavigate();

  const navigateToSignUp = () => {
    navigate("/reg");
  };
  const navigateToMainPage = () => {
    navigate("/mainpage");
  };
  return (
    <Wrapper>
      <Title />
      <form>
        <div className="container">
          <label htmlFor="uname">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="uname"
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

          <button type="submit" onClick={() => navigateToMainPage()}>
            Login
          </button>
          <button type="submit" onClick={() => navigateToSignUp()}>
            Register?
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Login;
