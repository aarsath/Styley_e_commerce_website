import axios from 'axios';
import { auth } from '../config/firebase'

// Function to make a request with an authentication token and request body
export const makeAuthenticatedRequest = async (uri, method, data = []) => {
    try {
      const reqEndpoint = `${import.meta.env.VITE_LOCAL_URL + uri}`
      const response = await axios({
          url: reqEndpoint,
          data: data,
          method: method
      })
      return response
  } catch (error) {
      console.error(error)
      throw error
  }
};

axios.interceptors.request.use(
  async config => {
      // Wait for the Firebase authentication initialization process to complete
      // Make sure auth is refreshed and we have currentUser all the time
      await new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            unsubscribe()
            resolve()
        })
      })
      // get currentUser from firebase
      const user = auth.currentUser
      if (user) {
          const idTokenResult = await user.getIdTokenResult()
          const refreshToken = idTokenResult.token
          
          config.headers['Authorization'] = refreshToken
      } else {
          console.error('Unauthorized, No user is currently logged in.')
      }
      return config
  },
  error => {
      Promise.reject(error)
  }
);
