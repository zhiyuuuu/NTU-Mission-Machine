import User from "../models/users";

exports.LoginByPassword = async(req, res) => {
    const username = req.body.data.username;
    const password = req.body.data.password;

    console.log('backend received user', req.body.data);

    const findUser = await User.find({ name: username, password });
    console.log('finding user...', findUser);

    if (findUser.length !== 0) {
        //console.log('send to frontend');
        res.send({ message: 'success' })
    } else {
        res.send({ message: "failed" })
    }
}

exports.SignUp = async(req, res) => {
    const body = req.body.data;
    const name = body.newName;
    const password = body.newPswd;
    //let currTask = []
    console.log('backend received sign up :', body);

    const setNewUser = new User({ name, password });

    try {
        await setNewUser.save();
        res.send({ message: "success" })
    } catch (error) {
        throw new Error("Sign up saving error" + error);
    }
}