import axios from 'axios'

const bdMuni = axios.create({
     baseURL: 'http://127.0.0.1:8000/api'
})

export default bdMuni