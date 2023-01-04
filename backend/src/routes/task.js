import Task from "../models/task";

exports.AddNewTask = async(req, res) => {
    const body = req.body;
    //console.log('backend received data', body);
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
    //console.log('data get from db...', findTask);

    if (findTask.length !== 0) {
        res.send({ message: "success", content: findTask })
    } else {
        res.send({ message: "get task error", content: [] })
    }
}

exports.GetReceivedTasks = async(req, res) => {
    const username = req.body.username;
    //console.log('backend received username', username);

    const findReceivedTask = await Task.find({ receiver: username });
    //console.log('finding user received tasks...', findReceivedTask);

    if (findReceivedTask.length !== 0) {
        res.send({ message: 'Found received task.', content: findReceivedTask })
    } else {
        res.send({ message: 'Received tasks not found.', content: [] })
    }
}

exports.GetPostedTasks = async(req, res) => {
    //console.log('received', req.body);
    const username = req.body.username;
    //console.log('backend received username', username);

    const findPostedTask = await Task.find({ issuer: username });
    //console.log('finding user posted tasks...', findPostedTask);

    if (findPostedTask.length !== 0) {
        res.send({ message: 'Found posted task.', content: findPostedTask })
    } else {
        res.send({ message: 'Posted tasks not found.', content: [] })
    }
}

exports.AddReceiverToTask = async(req, res) => {
    
    //console.log('backend received body', req.body.data);
    const username = req.body.data.username;
    const task_id = req.body.data.id;
    const status = req.body.data.public_status;

    try {
        let findTask = await Task.findById(task_id);
        //console.log('find the task...', findTask);
        if (findTask.receiver !== "none") {
            res.send({ message: "Already been applied :(" })
        } else if (findTask.issuer !== username) {    //not same person
            let updateTask = await Task.updateOne(
                { _id: task_id }, 
                { receiver: username, public_status: status }, 
                { new: true }
            );
            console.log('issuer not same as receiver');
            res.send({ message: "success" });
        } else {
            res.send({ message: "issuer cannot be same as receiver!" })
        }

        //res.send({ message: "success" });
    } catch (error) {
        res.send({ message: "error" });
        throw new Error('updating error' + error);
    }
}

exports.AddDoneStatus = async(req, res) => {  
    const id = req.body.data.id;
    const done = req.body.data.done_status;

    try {
        await Task.findByIdAndUpdate(id, { done: done });
        console.log('find the task and update it\'s done status.');
        res.send({ message: "success" })
    } catch (error) {
        res.send({ message: "Update status error" })
        throw new Error('updating error' + error)
    }
}

exports.CountOngoingTask = async(user) => {
    const findOngoingTask = await Task.find({ receiver: user, done: false });
    //console.log('find ongoing task of ' + user + '...', findOngoingTask);
    const taskCnt = findOngoingTask.length;
    //console.log('count from task', taskCnt);

    return taskCnt;
}
