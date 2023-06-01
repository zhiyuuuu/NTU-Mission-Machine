import Title from "../component/Title";
import styled from "styled-components";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";
import { handleSignUp } from "../api";
import { useState } from "react";
import "@material/mwc-button";
// import '@material/mwc-button-icon'
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

const Register = () => {
  const navigate = useNavigate();

  const navigateToSignIn = () => {
    navigate("/");
  };

  const [newName, setNewName] = useState("");
  const [newPswd, setNewPswd] = useState("");
  const [newCred, setNewCred] = useState([]);

  const signUp = async () => {
    let returnMsg = await handleSignUp({ newName, newPswd, newCred });
    //console.log('return msg: ', returnMsg);
    if (returnMsg.message === "success") {
      navigateToSignIn();
    } else if (returnMsg.message === "existed") {
      alert("Username already existed Q^Q");
    } else {
      alert("Something is wrong :(");
    }
  };

  const registerCredential = async () => {
    const challenge = new Uint8Array(32);
    window.crypto.getRandomValues(challenge);

    const userID = "Kosv9fPtkDoh4Oz7Yq/pVgWHS8HhdlCto5cR0aBoVMw=";
    const id = Uint8Array.from(window.atob(userID), (c) => c.charCodeAt(0));

    const publicKeyCredentialCreationOptions = {
      challenge,
      rp: {
        name: "NTU Mission Machine",
        id: "localhost",
      },
      user: {
        id,
        name: newName,
        displayName: newName,
      },
      pubKeyCredParams: [{ alg: -7, type: "public-key" }],
      authenticatorSelection: {
        authenticatorAttachment: "platform",
      },
      timeout: 60000,
      // attestation: "direct"
    };

    const credential = await navigator.credentials.create({
      publicKey: publicKeyCredentialCreationOptions,
    });

    console.log(credential);
    const decodeCredential = (credential) => {
      // decode the clientDataJSON into a utf-8 string
      const utf8Decoder = new TextDecoder("utf-8");
      const decodedClientData = utf8Decoder.decode(
        credential.response.clientDataJSON
      );
      // parse the string as an object
      const clientDataObj = JSON.parse(decodedClientData);
      console.log("client data object", clientDataObj);
      // clientDataObj = {
      // 	challenge: "3woJizj5lDH0h_g2Vnk7gnbow2eynNWidiwD6KdaDSU"
      // 	crossOrigin: false
      // 	origin: "http://localhost:3000"
      // 	type: "webauthn.create"}

      const decodedAttestationObj = CBOR.decode(
        credential.response.attestationObject
      );
      console.log("decoded attestation", decodedAttestationObj);

      const { authData, attStmt } = decodedAttestationObj;
      // console.log('auth length', authData.length, attStmt.sig.length);
      const credentialIdLength = attStmt.sig.length;
      // get the credential ID
      const credentialId = authData.slice(55, credentialIdLength);

      // get the public key object
      const publicKeyBytes = authData.slice(55 + credentialIdLength);

      // the publicKeyBytes are encoded again as CBOR
      // console.log('public key bytes', publicKeyBytes);
      // const publicKeyObject = CBOR.decode(publicKeyBytes.buffer);
      console.log("data going to save in db", credentialId, publicKeyBytes);
      setNewCred([
        {
          credID: credentialId,
          pubKey: publicKeyBytes,
        },
      ]);
    };
    decodeCredential(credential);
  };

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
        <mwc-button
          id="register"
          class="hidden"
          raised
          onClick={registerCredential}
        >
          Add a credential
        </mwc-button>
        <div className="clearfix" style={{ marginTop: "20px" }}>
          <button
            type="button"
            onClick={() => navigateToSignIn()}
            className="cancelbtn"
          >
            Cancel
          </button>
          <button type="submit" className="signupbtn" onClick={signUp}>
            Sign Up
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Register;
