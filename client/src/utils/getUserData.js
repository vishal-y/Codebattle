import axios from 'axios';

export const getUserData = async (username) => {
  try {
    const response = await axios.post("http://localhost:5000/user/getUser", {username : username },{withCredentials : true});
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error; // Re-throw the error to handle it where the function is called
  }
};
