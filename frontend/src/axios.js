import axios from "axios";

export const makeRequest = axios.create({
  //baseURL: "https://amaronsoftware.com/monumanagerapi/api",
  baseURL: "http://granitx.com:3000/monumanagerapi/api",
  withCredentials: true,
});
