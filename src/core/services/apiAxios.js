import axios from "axios";

const AxiosConfig = axios.create({
  baseURL: "http://localhost:5128",
});

export default AxiosConfig;
