import Task from "../models/task";

exports.AddNewTask = async(req, res) => {
    const body = req.body;
    //console.log('backend received data', body);
    const { topic, description, salary, ddl } = body.data;
    const newTask = new Task({ name: topic, detail: description, salary: salary, due: ddl });

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

    findTask.exec((err, data) => {
        if (err) {
            res.status(403).send({ message: "error", content: [] })
        }
        res.send({ message: "success", content: data })
    })
}

exports.GetMyTasks = async(req, res) => {
    const user_name = req.body.name;

    const findMyTask = await Task.find({ issuer: user_name });

    findMyTask.exec((err, data) => {
        if (err) {
            res.status(403).send({ message: "error", content: [] })
        }
        res.send({ message: "success", content: data });
    })
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

