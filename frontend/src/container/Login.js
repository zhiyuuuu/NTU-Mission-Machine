import Title from "../component/Title";
import styled from "styled-components";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";
import { handleLogin, handleCredentialLogin } from "../api";
import { useState } from "react";
import '@material/mwc-button'

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

	const buttonStyle = {
		backgroundColor: 'green',
	}

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [signByPswd, setSignByPswd] = useState(false);

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

	const handleSignByPswdOnclick = () => {
		setSignByPswd(!signByPswd);
	}

	const dbReturnCredential = async(name) => {
		const result = await handleCredentialLogin({ name });
		console.log('return cred result', result.credential[0]);
		return result.credential[0];
	}
	
	const authenticateCredential = async(name) => {

		const { credID, pubKey } = dbReturnCredential(name);

		const credential = await navigator.credentials.get({
			publicKey: publicKeyCredentialRequestOptions
		});
		console.log('get credential', credential);

		const challenge = new Uint8Array(32);
		window.crypto.getRandomValues(challenge);


		const publicKeyCredentialRequestOptions = {
			challenge,
			allowCredentials: [{
				id: credID, // from registration
				type: 'public-key',
				transports: ['usb', 'ble', 'nfc'],
			}],
			timeout: 60000,
		}

		const assertion = await navigator.credentials.get({
			publicKey: publicKeyCredentialRequestOptions
		});
		console.log('assertion', assertion);
	}


	return (
		<Wrapper>
			<Title />
			<div className="container" style={{ width: "30%" }}>
				<label>
					<b>Username</b>
				</label>
				<input
					type="text"
					placeholder="Enter Username"
					onChange={(e) => {
						setUsername(e.target.value);
					}}
					style={{ marginBottom: "25px" }}
				/>
			<div className="login-option">
				<div id="uvpa_available" class="hidden">
					{/* <h2>
						Verify your identity
					</h2> */}
					<div>
						<mwc-button 
							id="reauth"
							// style={{ backgroundColor: 'red' }} 
							raised
							onClick={() => authenticateCredential(username)}>
								Authenticate
						</mwc-button>
					</div>
					<div>
						<mwc-button id="cancel" onClick={handleSignByPswdOnclick}>Sign-in with password</mwc-button>
					</div>
				</div>
			</div>
			{
				signByPswd?
				<>
					<label>
						<b>Password</b>
					</label>
					<input
					type="password"
					placeholder="Enter Password"
					onChange={(e) => {
						setPassword(e.target.value);
					}}/>
				</>:''
			}
			
			<div style={{ marginTop: "30px" }}>
				<button onClick={loginTest}>Login</button>
				<button type="submit" onClick={() => navigateToSignUp()}>
					Register?
				</button>
			</div>
		</div>
		</Wrapper>
	);
};

export default Login;
