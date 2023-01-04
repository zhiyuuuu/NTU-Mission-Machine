import UserModel from "./models/users";
import TaskModel from "./models/task";
import UserData from "../user.json";
import TaskData from "../task.json";

const dataInit = async() => {
    const checkUser = await UserModel.find();

    if (checkUser.length !== 3) {
        console.log("Total users are not equal to default ", checkUser.length)
        await UserModel.deleteMany({})
        await UserModel.insertMany(UserData)
    } else {
        console.log("The number of users is correct", checkUser.length)
    }

    const checkTask = await TaskModel.find();

    if (checkTask.length !== 3) {
        console.log("Total tasks are not equal to default ", checkTask.length);
        await TaskModel.deleteMany({});
        await TaskModel.insertMany(TaskData);
    } else {
        console.log("The number of tasks is correct", checkTask.length);
    }
}

export { dataInit };