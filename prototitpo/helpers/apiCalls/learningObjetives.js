import axios from "axios";
import { url } from "../../config";

export const createObjetive = (body) => {
  return axios.post(`${url}/newObjetive`, body);
};
export const getObjetives = () => {
  return axios.get(`${url}/getObjetives`);
};