import Task from "../models/task";

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

