import axios from "axios";
export default axios.create({
  baseURL: "https://klickksassignment.onrender.com/api",
  withCredentials: true,
});
