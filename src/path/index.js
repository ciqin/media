


const API_URL = process.env.NODE_ENV === 'development' ? {
  API_URL: 'http://localhost:8096'
} : {
  API_URL: 'http://111.20.145.20:8006/wgproduct/'
}

export default API_URL
