import axios from "axios";
import { url } from "../../config";

export const createComponent = (body) => {
  return axios.post(`${url}/newComponent`, body);
};
export const getComponents = () => {
  return axios.get(`${url}/getComponents`);
};
export const deleteComponent = (id) => {
  return axios.delete(`${url}/deleteComponent/${id}`);
};