import axios from "axios";
import { url } from "../../config";

export const createComponent = (body,config) => {
  return axios.post(`${url}/newComponent`, body,config);
};
export const getComponents = (id,config) => {
  return axios.get(`${url}/getComponents/${id}`,config);
};
export const updateComponent = (pastName, body,config) => {
  return axios.post(`${url}/updateComponent/${pastName}`,body,config);
};
 export  const getComponent = (name,config) => {
  return axios.get(`${url}/getComponent/${name}`,config);
};
export const deleteComponent = (id,config) => {
  return axios.delete(`${url}/deleteComponent/${id}`,config);
};