import Task from "../models/task";

exports.AddNewTask = async(req, res) => {
    const body = req.body;
    console.log('backend received data', body);
    const { topic, description, salary, ddl, curUserName } = body.data;
    const newTask = new Task({ name: topic, detail: description, salary: salary, due: ddl, issuer: curUserName });

    //console.log('newTask', newTask);

    try {
        await newTask.save();
        res.send({ message: "success" })
    } catch (error) {
        throw new Error("saving error" + error);
    }
}

exports.GetAllTasks = async(req, res) => {
    const findTask = await Task.find();
    console.log('data get from db...', findTask);

    if (findTask.length !== 0) {
        res.send({ message: "success", content: findTask })
    }
    res.send({ message: "get task error", content: [] })
}

exports.GetReceivedTasks = async(req, res) => {
    const username = req.body.data.username;
    console.log('backend received username', username);

    const findReceivedTask = await Task.find({ receiver: username });
    console.log('finding user received tasks...', findReceivedTask);

    if (findReceivedTask.length !== 0) {
        res.send({ message: 'Found received task.', content: findReceivedTask })
    } else {
        res.send({ message: 'Received tasks not found.', content: [] })
    }
}

exports.GetPostedTasks = async(req, res) => {
    //console.log('received', req.body);
    const username = req.body.username;
    console.log('backend received username', username);

    const findPostedTask = await Task.find({ issuer: username });
    console.log('finding user posted tasks...', findPostedTask);

    if (findPostedTask.length !== 0) {
        res.send({ message: 'Found posted task.', content: findPostedTask })
    } else {
        res.send({ message: 'Posted tasks not found.', content: [] })
    }
}

exports.GetDetailOfTask = async(req, res) => {
    const task_id = req.body.id;

    const getDetail = await Task.findById(task_id);

    getDetail.exec((err, data) => {
        if (err) {
            res.status(403).send({ message: "error", content: [] });
        }
        res.send({ message: "success", content: data })
    })
}

