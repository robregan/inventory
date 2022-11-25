import axios from 'axios';

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;


export const registerUser = async (userData) => {
    try {
        const response = await axios.post(``, {userData, {withCredentials: true});`)
    } catch (error) {
        
    }
  const { data } = await axios.post(`${BACKEND_URL}/api/auth/register`, {
    name,
    email,
    password,
  });
  return data;
}