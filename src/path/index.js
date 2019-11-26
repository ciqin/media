


const API_URL = process.env.NODE_ENV === 'development' ? {
  API_URL: 'http://localhost:8096'
} : {
  API_URL: 'http://192.168.16.1/wgproduct/'
}

export default API_URL
