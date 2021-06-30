import axios from 'axios'

const headers = { }

export default () => {
  const authToken = localStorage.getItem(process.env.VUE_APP_TOKEN_NAME ?? 'token')

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`
  }

  return axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL ?? '/api',
    headers
  })
}
