import User from "../models/users";

exports.LoginByPassword = async(req, res) => {
    const username = req.body.data.username;
    const password = req.body.data.password;

    console.log('backend received user', req.body.data);

    // await User.find({ name: username, password }, function(err, data) {
    //     console.log('finding user..', data);
    //     if (err) {
    //         throw new Error("user finding error", err)
    //     }
    //     res.send({ message: 'success', content: data })
    //   });

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
    const body = req.body;
    const { name, password } = body;
    let currTask = []

    const setNewUser = new User({ name, password, currTask });

    try {
        await setNewUser.save();
        res.send({ message: "success" })
    } catch (error) {
        throw new Error("Sign up saving error" + error);
    }
}