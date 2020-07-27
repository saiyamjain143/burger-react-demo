import axios from "axios";

const instance = axios.create({
  baseURL: "https://socialauthentication-54774.firebaseio.com/",
});

export default instance;
