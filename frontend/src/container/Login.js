import Title from "../component/Title";
import styled from "styled-components";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";
import { handleLogin, handleCredentialLogin } from "../api";
import { useState } from "react";
import "@material/mwc-button";
import base64url from "base64url";
import CBOR from "cbor-js";
import { Buffer } from 'buffer';

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

        // credential type transform : object -> ArrayBuffer
        const credentialIdArray = Object.values(credID);
        const credentialIdBuffer = new Uint8Array(credentialIdArray).buffer;
        console.log('orig id', credID, 'decoded id', credentialIdBuffer);

        // random challenge
        const challenge = new Uint8Array(32);
        window.crypto.getRandomValues(challenge);

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
        console.log('client data array', clientDataJSON);
        console.log('hased client data', hashedClientData);

        const encoder = new TextEncoder();
        const hashedBuffer = encoder.encode(hashedClientData).buffer; //ArrayBuffer(64)

        // const storedCredential = credentialIdBuffer;
        const authenticateByte = new Uint8Array(authenticatorData)
        console.log('authenticatorData Byte', authenticateByte);
        console.log('hashed buffer', hashedBuffer);


        // const isSignatureValid = storedCredential.publicKey.verify(signature, signedData);

        // verify signature
        // async function verifySignature(signature, data, publicKey) {
        //     return await window.crypto.createVerify('SHA256').update(data).verify(publicKey, signature);
        // }

        async function verifySignature(signature, data, publicKey) {
            const encoder = new TextEncoder();
            const dataBuffer = encoder.encode(data).buffer;
            const pbArr = base64url.toBuffer(publicKey);
            console.log('current public key', pbArr);
          
            const publicKeyBuffer = await crypto.subtle.importKey(
                'raw',
                // publicKey,
                pbArr,
                {
                    name: 'RSASSA-PKCS1-v1_5',
                    hash: 'SHA-256',
                    namedCurve: 'P-256',
                    key_ops: 'verify'
                },
                false,
                ['verify']
            ).catch((err) => {
                console.log('crypto import key' + new Error(err));
            })
            const signatureBuffer = new Uint8Array(signature);

            // console.log('PBK', publicKeyBuffer, 'sig', signature, 'data', dataBuffer); //ArrayBuffer(77)
          
            const result = await crypto.subtle.verify(
              {
                name: 'RSASSA-PKCS1-v1_5',
                hash: { name: 'SHA-256' },
              },
              publicKeyBuffer,
              signature,
              dataBuffer
            ).catch((err) => console.log(new Error(err)));
          
            return result;
        }

        function hash(data) {
            return crypto.createHash('SHA256').update(data).digest();
        }

        // const clientDataHash = hash(base64url.toBuffer(clientDataJSON));
        // const clientDataHash = hash(encoder.encode(clientDataArray).buffer);
        // console.log('client data hash', clientDataHash);
        const clientDataHash = hashedBuffer;

        function parseGetAssertAuthData(buffer) {
            const rpIdHash = buffer.slice(0, 32);
            buffer = buffer.slice(32);
        
            const flagsBuf = buffer.slice(0, 1);
            buffer = buffer.slice(1);
        
            const flagsInt = flagsBuf[0];
            const flags = {
                up: !!(flagsInt & 0x01),
                uv: !!(flagsInt & 0x04),
                at: !!(flagsInt & 0x40),
                ed: !!(flagsInt & 0x80),
                flagsInt,
            };
        
            const counterBuf = buffer.slice(0, 4);
            buffer = buffer.slice(4);
            console.log('counterBuf', counterBuf);
        
            // const counter = counterBuf.readUInt32BE(0);
            const counterView = new DataView(counterBuf);
            const counter = counterView.getUint32(0, false);
        
            return { rpIdHash, flagsBuf, flags, counter, counterBuf };
        }

        let authrDataStruct = parseGetAssertAuthData(authenticatorData);

		// const signatureBase = Buffer.concat([
		// 	authrDataStruct.rpIdHash,
		// 	authrDataStruct.flagsBuf,
		// 	authrDataStruct.counterBuf,
		// 	clientDataHash,
		// ]);
        // const encoder = new TextEncoder();

        const rpIdHashArray = new Uint8Array(authrDataStruct.rpIdHash);
        const flagsArray = new Uint8Array(authrDataStruct.flagsBuf);
        const counterArray = new Uint8Array(authrDataStruct.counterBuf);
        const clientDataHashArray = new Uint8Array(clientDataHash);

        const signatureBase = new Uint8Array(
        encoder.encode(
            String.fromCharCode(...rpIdHashArray) +
            String.fromCharCode(...flagsArray) +
            String.fromCharCode(...counterArray) +
            String.fromCharCode(...clientDataHashArray)
        )
        );
        console.log('signature base', signatureBase);

        const pubKeyArray = Object.values(pubKey);
        const pubKeyBuffer = new Uint8Array(pubKeyArray).buffer;
        // console.log('pub key buffer', pubKeyBuffer);


        // function ASN1toPEM(pkBuffer) {
        //     if (!Buffer.isBuffer(pkBuffer)) throw new Error('ASN1toPEM: input must be a Buffer');
        //     let type;
        //     if (pkBuffer.length == 65 && pkBuffer[0] == 0x04) {
        //         pkBuffer = Buffer.concat([new Buffer.from('3059301306072a8648ce3d020106082a8648ce3d030107034200', 'hex'), pkBuffer]);
        //         type = 'PUBLIC KEY';
        //     } else type = 'CERTIFICATE';
        //     const base64Certificate = pkBuffer.toString('base64');
        //     let PEMKey = '';
        
        //     for (let i = 0; i < Math.ceil(base64Certificate.length / 64); i++) {
        //         const start = 64 * i;
        //         PEMKey += base64Certificate.substr(start, 64) + '\n';
        //     }
        
        //     PEMKey = `-----BEGIN ${type}-----\n` + PEMKey + `-----END ${type}-----\n`;
        
        //     return PEMKey;
        // }

        // function checkPEM(pubKey){
        //     return pubKey.toString('base64').includes('BEGIN');
        // }

		// const publicKey = checkPEM(authr.publicKey) ? 
		// 	authr.publicKey.toString('base64')
		// 	:
		// 	ASN1toPEM(base64url.toBuffer(authr.publicKey))
		// ;
        // console.log('public key', publicKey);

        let response = { verified: false };
		// const signature2Buffer = base64url.toBuffer(signature);
        const signature2Buffer = new Uint8Array(signature).buffer;
        console.log('signature 2 buffer', signature2Buffer);
		response.verified = await verifySignature(signature2Buffer, signatureBase, pubKeyBuffer);

        // const registrationSignature = signature;
        // const challengeBuffer = challenge;

        // const pubKeyArray = Object.values(pubKey);
        // const pubKeyBuffer = new Uint8Array(pubKeyArray).buffer;
        // // console.log('pub key buffer', pubKeyBuffer);
        // const storedPublicKey = pubKeyBuffer;
        
        // // Convert the registration signature to an ArrayBuffer
        // const signatureBuffer = new Uint8Array(registrationSignature).buffer;

        // console.log('storeded public key', storedPublicKey);
        // console.log('signature buffer', signatureBuffer);
        
        // async function signData(privateKey, data) {
        //     const algorithm = { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' };
        //     const cryptoKey = await crypto.subtle.importKey(
        //       'pkcs8',
        //       privateKey,
        //       algorithm,
        //       false,
        //       ['sign']
        //     );
        //     const signature = await crypto.subtle.sign(algorithm, cryptoKey, data);
        //     console.log('signature', signature);
        //     return signature;
        // }
          
        // // Usage example
        // const privateKey = clientDataJSON;
        // const originalData = authenticatorData;
        // const sig = await signData(privateKey, originalData).catch(err => console.log(err));

        // console.log(sig);
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
