import User from "../models/users";

exports.LoginByPassword = async(req, res) => {
    const username = req.body.name;
    const password = req.body.password;

    const findUser = await User.find({ name: username, password })
    
    findUser.exec((err, data) => {
        if (err) {
            res.status(403).send({ message: 'Username or password is incorrect.' })
        }
        res.send({ message: 'success', content: data })
    })
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