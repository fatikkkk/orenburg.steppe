import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3001/api',
})

// instance.interceptors.request.use(config => {
//     config.headers.
// })

export default instance