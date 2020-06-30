import axios from "axios";
import { url } from "../../config";

export const createComponent = (body) => {
  return axios.post(`${url}/newComponent`, body);
};
export const getComponents = () => {
  return axios.get(`${url}/getComponents`);
};
export const updateComponent = (pastName, body) => {
  return axios.post(`${url}/updateComponent/${pastName}`,body);
};
export const getComponent = (name) => {
  return axios.get(`${url}/getComponent/${name}`);
};
export const deleteComponent = (id) => {
  return axios.delete(`${url}/deleteComponent/${id}`);
};