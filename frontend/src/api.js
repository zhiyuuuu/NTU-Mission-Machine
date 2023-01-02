import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:4000/"
})

const addPost = async(data) => {
    return await instance.post('/', { data }).then((res) => {
        //console.log('save data', data);
        return res.data;
    })
}

const handleLogin = async(data) => {
    return await instance.post('/login', { data }).then((res) => {
        //console.log('login data', res.data);
        return res.data;
    })
}

const handleSignUp = async(data) => {
    return await instance.post('/signup', { data }).then((res) => {
        //console.log('sign up data', res.data);
        return res.data;
    })
}

export { addPost, handleLogin, handleSignUp }