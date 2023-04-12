import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://amaronsoftware.com/monumanagerapi/api",
  withCredentials: true,
});
