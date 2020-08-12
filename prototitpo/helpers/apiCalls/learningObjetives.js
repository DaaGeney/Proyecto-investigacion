import axios from "axios";
import { url } from "../../config";

export const createObjetive = (body,config) => {
  return axios.post(`${url}/newObjetive`, body,config);
};
export const getObjetives = (config) => {
  return axios.get(`${url}/getObjetives`,config);
};