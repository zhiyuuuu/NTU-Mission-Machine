import { get } from "mongoose";
import User from "../models/users";
import taskRoute from "./task";
const base64url = require('base64url');
const crypto = require('crypto');

exports.LoginByPassword = async(req, res) => {
    const username = req.body.data.username;
    const password = req.body.data.password;

    //console.log('backend received user', req.body.data);

    const findUser = await User.find({ name: username, password });
    // console.log('finding user...', findUser);

    if (findUser.length !== 0) {
        //console.log('send to frontend');
        res.send({ message: 'success' })
    } else {
        res.send({ message: "failed" })
    }
}

exports.LoginByCredential = async(req, res) => {
    const { name } = req.body.data;
    console.log('req body data', req.body.data);

    const getCred = await User.find({ name });
    // console.log('find user cred by name', name, getCred[0].credential);

    if (getCred.length !== 0) {
        //console.log('send to frontend');
        res.send({ message: "success", credential: getCred[0].credential })
    } else {
        res.send({ message: "failed" })
    }
}

exports.SignUp = async(req, res) => {
    const body = req.body.data;
    const name = body.newName;
    const password = body.newPswd;
    const credential = body.newCred;
    //let currTask = []
    console.log('backend received sign up :', body);

    //check existed username
    const findExistedName = await User.find({ name: name });
    console.log('find..', findExistedName.length);
    if (findExistedName.length !== 0) {
        res.send({ message: "existed" })
    } else {
        const setNewUser = new User({ name, password, credential });

        try {
            await setNewUser.save();
            res.send({ message: "success" })
        } catch (error) {
            throw new Error("Sign up saving error" + error);
        }
    }
}


exports.GetCount = async(req, res) => {
    const user = req.body.username;
    //console.log('backend received user', username);
    const count = await taskRoute.CountOngoingTask(user)
    //console.log('counting result', count);
    
    try {
        let updateCnt = await User.findOneAndUpdate({ name: user }, { taskCount: count }, { new: true })
        //console.log('updating...', updateCnt.taskCount);
        // console.log('find cnt..', findCnt[0].taskCount);
        res.send({ message: "success", content: updateCnt.taskCount })
    } catch (error) {
        throw new Error("Finding count error" + error);
    }
}

exports.Verification = async(req, res) => {
    const { assertionResponse, publicKey } = req.body.data;
    // console.log('server received', assertionResponse, publicKey);
    
    async function verifyAuthenticatorAssertionResponse(webAuthnResponse, pubKey) {
        // const authr = findAuthenticator(webAuthnResponse.id, authenticators);
        const authenticatorData = base64url.toBuffer(webAuthnResponse.authenticatorData);
    
        let response = { verified: false };

            let authrDataStruct = parseGetAssertAuthData(authenticatorData);
    
            // if (!authrDataStruct.flags.up) throw new Error('User was NOT presented durring authentication!');
    
            const clientDataHash = hash(base64url.toBuffer(webAuthnResponse.clientDataJSON));
            const signatureBase = Buffer.concat([
                authrDataStruct.rpIdHash,
                authrDataStruct.flagsBuf,
                authrDataStruct.counterBuf,
                clientDataHash,
            ]);
            // console.log('input pubKey', pubKey);
            const publicKey = checkPEM(pubKey) ? 
                pubKey.toString('base64')
                :
                ASN1toPEM(base64url.toBuffer(pubKey))
            ;
            const signature = base64url.toBuffer(webAuthnResponse.signature);
            response.verified = await verifySignature(signature, signatureBase, publicKey);
    
            // if (response.verified) {
            //     if (response.counter <= authr.counter) throw new Error('Authr counter did not increase!');
    
            //     authr.counter = authrDataStruct.counter;
            // }
    
        return response;
    }

    function hash(data) {
        return crypto.createHash('SHA256').update(data).digest();
    }

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
    
        const counter = counterBuf.readUInt32BE(0);
    
        return { rpIdHash, flagsBuf, flags, counter, counterBuf };
    }

    function ASN1toPEM(pkBuffer) {
        if (!Buffer.isBuffer(pkBuffer)) throw new Error('ASN1toPEM: input must be a Buffer');
        let type = 'PUBLIC KEY';
        console.log('pkBuffer', pkBuffer);

        // if (pkBuffer.length == 65 && pkBuffer[0] == 0x04) {
            pkBuffer = Buffer.concat([new Buffer.from('3059301306072a8648ce3d020106082a8648ce3d030107034200', 'hex'), pkBuffer]);
            // type = 'PUBLIC KEY';
        // } else {
        //     console.log('pkBuffer length', pkBuffer.length);
        // }
        // else type = 'CERTIFICATE';
        const base64Certificate = pkBuffer.toString('base64');
        let PEMKey = '';
    
        for (let i = 0; i < Math.ceil(base64Certificate.length / 64); i++) {
            const start = 64 * i;
            PEMKey += base64Certificate.substr(start, 64) + '\n';
        }

        const hasSpace = PEMKey.includes(' ');
        console.log('has space', hasSpace);
        const withoutSpaces = PEMKey.replace(/\s/g, '');
        // console.log('without space', withoutSpaces);
    
        PEMKey = `-----BEGIN ${type}-----\n` + withoutSpaces + `\n-----END ${type}-----`;
    
        return PEMKey;
    }

    function checkPEM(pubKey){
        return pubKey.toString('base64').includes('BEGIN');
    }

    async function verifySignature(signature, data, publicKey) {
        console.log('public key', publicKey);

        // console.log('signature', signature);
        // const verify = await crypto.createVerify('SHA256');
        // console.log('try verify', verify.verify(publicKey, signature));
        return await crypto.createVerify('SHA256').update(data).verify(publicKey, signature);
    }

    const result = await verifyAuthenticatorAssertionResponse(assertionResponse, publicKey);
    console.log('verify result', result);
}