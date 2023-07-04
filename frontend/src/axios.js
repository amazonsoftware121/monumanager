import axios from "axios";

export const makeRequest = axios.create({
  //baseURL: "https://amaronsoftware.com/monumanagerapi/api",
  baseURL: "http://localhost:5000/monumanagerapi/api",
  withCredentials: true,
});
