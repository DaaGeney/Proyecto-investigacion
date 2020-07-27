import axios from "axios";
import { url } from "../../config";

export const createUser = (body) => {
  return axios.post(`${url}/user/createUser`, body);
};

export const logIn = (body) => {
  return axios.post(`${url}/user/logIn`,body);
};

export const updateUser = (pastEmail,body) => {
  return axios.post(`${url}/user/update/${pastEmail}`,body);
};

export const getUsers = () =>{
  return axios.get(`${url}/user/getUsers`);
}
export const deleteUser = (id) => {
  return axios.delete(`${url}/user/delete/${id}`);
};