import Title from "../component/Title";
import styled from "styled-components";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";
import { handleLogin, handleCredentialLogin } from "../api";
import { useState } from "react";
import "@material/mwc-button";
import base64url from "base64url";
import CBOR from "cbor-js";
import { Buffer } from "buffer";

// @ts-ignore
window.Buffer = Buffer;
// import crypto from 'crypto-browserify';
// import stream from 'stream-browserify';
// const crypto = require('crypto');
// Shims the crypto property onto global
// global.crypto = crypto;

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
    //  -------------------
    //DEMO
    const [loading, setLoading] = useState(false);
    const startLoading = () => {
        // setLoading(true);
        const buildLoading = setTimeout(() => {
            setLoading(false);
            // console.log('time out');
        }, 5000); // Set the duration for 1 second (1000 milliseconds)
        return () => clearTimeout(buildLoading);
    };

    // -----------------------------

    const navigate = useNavigate();

    const navigateToSignUp = () => {
        navigate("/reg");
    };

    const navigateToMainPage = async() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            console.log("spin");
            navigate("/mainpage", {
                state: {
                    username: username,
                },
            });
          }, 3000);        
    };

    const buttonStyle = {
        backgroundColor: "green",
    };

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [signByPswd, setSignByPswd] = useState(false);

    // const loginTest = async () => {
    //     let loginResult = await handleLogin({ username, password });

    //     if (loginResult.message === "success") {
    //         navigateToMainPage();
    //     } else {
    //         alert("Username or password is incorrect.");
    //     }
    //     setUsername("");
    //     setPassword("");
    // };

    const handleSignByPswdOnclick = () => {
        setSignByPswd(!signByPswd);
    };

    const dbReturnCredential = async (name) => {
        const result = await handleCredentialLogin({ name });
        // console.log("return cred result", result.credential[0]);
        return result.credential[0];
    };

    const authenticateCredential = async (name) => {
        // console.log("authenticating");
        const { credID, pubKey } = await dbReturnCredential(name); // 等待 Promise 解析

        // credential type transform : object -> ArrayBuffer
        const credentialIdArray = Object.values(credID);
        const credentialIdBuffer = new Uint8Array(credentialIdArray).buffer;
        // console.log("orig id", credID, "decoded id", credentialIdBuffer);

        // random challenge
        const challenge = new Uint8Array(32);
        window.crypto.getRandomValues(challenge);

        const publicKeyCredentialRequestOptions = {
            challenge,
            allowCredentials: [
                {
                    id: credentialIdBuffer,
                    type: "public-key",
                    transports: ["internal"],
                },
            ],
            timeout: 60000,
        };

        const assertion = await navigator.credentials.get({
            publicKey: publicKeyCredentialRequestOptions,
        });
        // console.log("assertion", assertion);
        // PublicKeyCredential {rawId: ArrayBuffer(32), response: AuthenticatorAssertionResponse, authenticatorAttachment: 'platform', id: 'GE7A5FIbqTbgluzJ36EdcKWjlmMMcuW2UoHy8lS7po8', type: 'public-key'}

        const assertionResponse = assertion.response;
        const authenticatorData = assertionResponse.authenticatorData; // ArrayBuffer(37)
        const clientDataJSON = assertionResponse.clientDataJSON; // ArrayBuffer(134)
        const signature = assertionResponse.signature; // ArrayBuffer(71)
        const userHandle = assertionResponse.userHandle; // ArrayBuffer(32)

        // // Function to compute SHA-256 hash
        async function sha256(message) {
            const encoder = new TextEncoder();
            const data = encoder.encode(message);
            const hashBuffer = await crypto.subtle.digest("SHA-256", data);

            // Function to convert Uint8Array to hexadecimal string
            function arrayBufferToHex(buffer) {
                return Array.prototype.map
                    .call(new Uint8Array(buffer), (byte) => {
                        return ("00" + byte.toString(16)).slice(-2);
                    })
                    .join("");
            }
            return arrayBufferToHex(hashBuffer);
        }

        // hash client data
        const clientDataArray = new Uint8Array(clientDataJSON);
        const hashedClientData = await sha256(clientDataArray);
        // console.log("client data array", clientDataJSON);
        // console.log("hased client data", hashedClientData);

        const encoder = new TextEncoder();
        const hashedBuffer = encoder.encode(hashedClientData).buffer; //ArrayBuffer(64)

        // const storedCredential = credentialIdBuffer;
        const authenticateByte = new Uint8Array(authenticatorData);
        // console.log("authenticatorData Byte", authenticateByte);
        // console.log("hashed buffer", hashedBuffer);

        navigateToMainPage();
    };

    return (
        <Wrapper>
            <Title />
            {loading && <Spin />} 
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
                                onClick={() => authenticateCredential(username)}
                            >
                                Authenticate
                            </mwc-button>
                        </div>
                        <div>
                            <mwc-button
                                id="cancel"
                                onClick={handleSignByPswdOnclick}
                            >
                                Sign-in with password
                            </mwc-button>
                        </div>
                    </div>
                </div>
                {signByPswd ? (
                    <>
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
                    </>
                ) : (
                    ""
                )}

                <div style={{ marginTop: "30px" }}>
                    <button>Login</button>
                    <button type="submit" onClick={() => navigateToSignUp()}>
                        Register?
                    </button>
                </div>
            </div>
        </Wrapper>
    );
};

export default Login;
