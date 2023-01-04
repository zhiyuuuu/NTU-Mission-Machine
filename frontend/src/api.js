import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/",
});

const addPost = async (data) => {
  return await instance.post("/", { data }).then((res) => {
    //console.log('save data', data);
    return res.data;
  });
};

const handleLogin = async (data) => {
  return await instance.post("/login", { data }).then((res) => {
    //console.log('login data', res.data);
    return res.data;
  });
};

const handleSignUp = async (data) => {
  return await instance.post("/signup", { data }).then((res) => {
    //console.log('sign up data', res.data);
    return res.data;
  });
};

const handleMyTask = async (username) => {
  return await instance.post("/mytasks", { username }).then((res) => {
    return res.data;
  });
};

const handleMyRequest = async (username) => {
  return await instance.post("/myrequests", { username }).then((res) => {
    //console.log("response", res.data);
    return res.data;
  });
};

const handleAllTasks = async () => {
  return await instance.get("/tasks").then((res) => {
    //console.log("all task", res.data);
    return res.data;
  });
};

const handleEachTask = async (task_id) => {
  return await instance.post("/tasks/content", { task_id }).then((res) => {
    // console.log('each task response', res.data);
    return res.data;
  });
};

const handleApply = async (data) => {
  return await instance.post("/apply", { data }).then((res) => {
    //console.log('res', res.data);
    return res.data;
  });
};

const updateDoneStatus = async (data) => {
  return await instance.post("/progress", { data }).then((res) => {
    // console.log("update done status api res", res.data);
    return res.data;
  });
};

const getRecordTask = async (username) => {
  return await instance.post("/getrecord", { username }).then((res) => {
    //console.log('api received count', res.data);
    return res.data;
  });
};

export {
  addPost,
  handleLogin,
  handleSignUp,
  handleMyTask,
  handleMyRequest,
  handleAllTasks,
  handleEachTask,
  handleApply,
  updateDoneStatus,
  getRecordTask,
};
