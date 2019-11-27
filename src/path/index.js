


const API_URL = process.env.NODE_ENV === 'development' ? {
  API_URL: 'http://localhost:8096'
} : {
  API_URL: '/wgproduct/'
}

export default API_URL
