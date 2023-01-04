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

exports.AddTaskCount = async(req, res) => {
    const username = req.body.data.username;
    const count = req.body.data.taskCnt;

    try {
        await User.findOneAndUpdate({ name: username }, { taskCount: count })
        console.log('updating task count...');
        res.send({ message: "success" })
    } catch (error) {
        throw new Error("Update count error" + error);
    }
}

exports.GetCount = async(req, res) => {
    const username = req.body.username;
    
    try {
        let findCnt = await User.find({ name: username })
        console.log('find cnt..', findCnt[0].taskCount);
        res.send({ message: "success", content: findCnt[0].taskCount })
    } catch (error) {
        throw new Error("Finding count error" + error);
    }
}