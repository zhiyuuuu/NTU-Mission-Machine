import Title from "../component/Title";
import styled from "styled-components";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";
import { handleLogin, handleCredentialLogin } from "../api";
import { useState } from "react";
import "@material/mwc-button";
import base64url from "base64url";
import CBOR from "cbor-js";

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
        backgroundColor: "green",
    };

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
    };

    const dbReturnCredential = async (name) => {
        const result = await handleCredentialLogin({ name });
        // console.log("return cred result", result.credential[0]);
        return result.credential[0];
    };

    const authenticateCredential = async (name) => {
        console.log("authenticating");
        const { credID, pubKey } = await dbReturnCredential(name); // 等待 Promise 解析

        function stringToArrayBuffer(str) {
            const encoder = new TextEncoder();
            return encoder.encode(str).buffer;
        }

        // const result = await dbReturnCredential(name);
        // console.log(result);
        // const credID = stringToArrayBuffer(result.credID);

        const credentialIdArray = Object.values(credID);
        const credentialIdBuffer = new Uint8Array(credentialIdArray).buffer;
        console.log('credential id buffer', credentialIdBuffer);

        console.log('orig id', credID, 'decoded id', credentialIdBuffer);

        const id = localStorage.getItem('credID')
        const decodedId = Uint8Array.from(id, c => c.charCodeAt(0))

        const challenge = new Uint8Array(32);
        window.crypto.getRandomValues(challenge);
        // console.log('decode id', Uint8Array.from(credID, c => c.charCodeAt(0)));

        const publicKeyCredentialRequestOptions = {
            challenge,
            allowCredentials: [{
                id: credentialIdBuffer,
                type: 'public-key',
                transports: ['internal'],
            }],
            timeout: 60000,
        }

        const assertion = await navigator.credentials.get({
            publicKey: publicKeyCredentialRequestOptions,
        });
        console.log("assertion", assertion);

        const assertionResponse = assertion.response;
        const authenticatorData = assertionResponse.authenticatorData; // Get the authenticatorData
        const clientDataJSON = assertionResponse.clientDataJSON; // Get the clientDataJSON
        // const hashedDataJSON = ""
        const signature = assertionResponse.signature; // Get the signature
        const userHandle = assertionResponse.userHandle; // Get the userHandle

        // // Function to convert Uint8Array to hexadecimal string
        function arrayBufferToHex(buffer) {
          return Array.prototype.map
            .call(new Uint8Array(buffer), (byte) => {
              return ("00" + byte.toString(16)).slice(-2);
            })
            .join("");
        }

        // // Function to compute SHA-256 hash
        async function sha256(message) {
          const encoder = new TextEncoder();
          const data = encoder.encode(message);
          const hashBuffer = await crypto.subtle.digest("SHA-256", data);
          return arrayBufferToHex(hashBuffer);
        }

        const clientDataArray = new Uint8Array(clientDataJSON);
        const hashedClientData = await sha256(clientDataArray);
        console.log('client data JSON', clientDataJSON);
        console.log('hased client data', hashedClientData);

        const encoder = new TextEncoder();
        const hashedBuffer = encoder.encode(hashedClientData).buffer;

        // const storedCredential = credentialIdBuffer;
        console.log('authenticatorData', authenticatorData);
        const hashedClientDataBuffer = new Uint8Array(hashedClientData).buffer
        console.log('hashed buffer', hashedBuffer);

        // const signedData = authenticatorData + new Uint8Array(hashedClientData).buffer;
        function combineArrayBuffers(buffer1, buffer2) {
            // Create a new buffer with the combined length
            const combinedLength = buffer1.byteLength + buffer2.byteLength;
            const combinedBuffer = new ArrayBuffer(combinedLength);
          
            // Create views to manipulate the data
            const view1 = new Uint8Array(buffer1);
            const view2 = new Uint8Array(buffer2);
            const combinedView = new Uint8Array(combinedBuffer);
          
            // Copy the data from the first buffer to the combined buffer
            combinedView.set(view1, 0);
          
            // Copy the data from the second buffer to the combined buffer
            combinedView.set(view2, view1.length);
          
            return combinedBuffer;
        }

        const signedData = combineArrayBuffers(authenticatorData, hashedBuffer);


        console.log('signed data', signedData);
        // const isSignatureValid = storedCredential.publicKey.verify(signature, signedData);

        const registrationSignature = signature;
        const challengeBuffer = challenge;

        const pubKeyArray = Object.values(pubKey);
        const pubKeyBuffer = new Uint8Array(pubKeyArray).buffer;
        // console.log('pub key buffer', pubKeyBuffer);
        const storedPublicKey = pubKeyBuffer;
        
        // Convert the registration signature to an ArrayBuffer
        const signatureBuffer = new Uint8Array(registrationSignature).buffer;

        console.log('storeded public key', storedPublicKey);
        console.log('signature buffer', signatureBuffer);
        
        async function signData(privateKey, data) {
            const algorithm = { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' };
            const cryptoKey = await crypto.subtle.importKey(
              'pkcs8',
              privateKey,
              algorithm,
              false,
              ['sign']
            );
            const signature = await crypto.subtle.sign(algorithm, cryptoKey, data);
            console.log('signature', signature);
            return signature;
        }
          
        // Usage example
        const privateKey = clientDataJSON;
        const originalData = authenticatorData;
        const sig = await signData(privateKey, originalData).catch(err => console.log(err));

        console.log(sig);
        // if (isSignatureValid) {
        //   navigateToMainPage();
        // } else {
        //   alert("login failed");
        // }
    };

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
                onClick={() => authenticateCredential(username)}
              >
                Authenticate
              </mwc-button>
            </div>
            <div>
              <mwc-button id="cancel" onClick={handleSignByPswdOnclick}>
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
