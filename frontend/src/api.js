import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:4000/"
})

const addPost = async(data) => {
    return await instance.post('/', { data }).then((res) => {
        console.log('save data', data);
    })
}

export { addPost }