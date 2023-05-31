import { get } from "mongoose";
import User from "../models/users";
import taskRoute from "./task";

exports.LoginByPassword = async(req, res) => {
    const username = req.body.data.username;
    const password = req.body.data.password;

    //console.log('backend received user', req.body.data);

    const findUser = await User.find({ name: username, password });
    console.log('finding user...', findUser);

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
    console.log('find user cred by name', name, getCred[0].credential);

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