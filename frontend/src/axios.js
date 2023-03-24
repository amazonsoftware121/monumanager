import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://localhost:4500/api/",
  withCredentials: true,
});
