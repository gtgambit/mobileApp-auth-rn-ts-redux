import axios from "axios";

export const getUserAvatar = async () => {
  try {
    const { data } = await axios.get(`https://reqres.in/api/users/4`);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
