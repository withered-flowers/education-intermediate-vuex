import axios from "axios";

const instance = axios.create({
  baseURL: "https://official-joke-api.appspot.com/",
});

export default instance;
