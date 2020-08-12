import axios from "axios";
import { url } from "../../config";

export const createUser = (body) => {
  return axios.post(`${url}/user/createUser`, body);
};

export const logIn = (body) => {
  return axios.post(`${url}/user/logIn`,body);
};
export const changePassword = (body,config) => {
  return axios.post(`${url}/user/changePassword`,body,config);
};
export const updateUser = (pastEmail,body,config) => {
  return axios.post(`${url}/user/update/${pastEmail}`,body,config);
};
export const sendEmail = (body) => {
  return axios.post(`${url}/user/sendEmail`,body);
};
export const getUsers = (config) =>{
  return axios.get(`${url}/user/getUsers`,config);
}
export const deleteUser = (id,config) => {
  return axios.delete(`${url}/user/delete/${id}`,config);
};
export const getRole = (id) =>{
  return axios.get(`${url}/user/getRole/${id}`);
}
