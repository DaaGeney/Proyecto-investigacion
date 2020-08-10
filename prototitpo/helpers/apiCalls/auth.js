import axios from "axios";
import { url } from "../../config";

export const createUser = (body) => {
  return axios.post(`${url}/user/createUser`, body);
};

export const logIn = (body) => {
  return axios.post(`${url}/user/logIn`,body);
};
export const changePassword = (body) => {
  return axios.post(`${url}/user/changePassword`,body);
};
export const updateUser = (pastEmail,body) => {
  return axios.post(`${url}/user/update/${pastEmail}`,body);
};
export const sendEmail = (body) => {
  return axios.post(`${url}/user/sendEmail`,body);
};
export const getUsers = () =>{
  return axios.get(`${url}/user/getUsers`);
}
export const deleteUser = (id) => {
  return axios.delete(`${url}/user/delete/${id}`);
};
export const getRole = (id) =>{
  return axios.get(`${url}/user/getRole/${id}`);
}
