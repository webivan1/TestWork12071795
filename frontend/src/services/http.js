import axios from 'axios'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL ?? '/api',
})

http.interceptors.request.use(config => {
  const authToken = localStorage.getItem(process.env.VUE_APP_TOKEN_NAME ?? 'token')
  config.headers.Authorization = `Bearer ${authToken}`
  return config
})

export default http
