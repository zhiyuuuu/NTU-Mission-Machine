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
  try {
    // 給username，回傳他的所有 tasks
    const {
      data: { tasks },
    } = await instance.get("/mytask", { params: { username } });
    return tasks;
  } catch (error) {
    throw new Error(username + "has something wrong");
  }
};

const handleMyRequest = async (username) => {
  try {
    // 給username，回傳他的所有 requests
    const {
      data: { tasks },
    } = await instance.get("/myrequest", { params: { username } });
    return tasks;
  } catch (error) {
    throw new Error(username + "has something wrong");
  }
};

export { addPost, handleLogin, handleSignUp, handleMyTask, handleMyRequest };
