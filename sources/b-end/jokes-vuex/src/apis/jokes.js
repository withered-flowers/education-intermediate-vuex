import axios from "axios";

const instance = axios.create({
  baseURL: "https://v2.jokeapi.dev/",
});

export default instance;
