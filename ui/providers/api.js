import Axios from 'axios'

export const urls = {
  test: `http://localhost`,
  development: 'http://localhost:9000',
  production: 'http://localhost:9000'
}

const api = Axios.create({
  baseURL: urls[process.env.NODE_ENV],
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export default api
