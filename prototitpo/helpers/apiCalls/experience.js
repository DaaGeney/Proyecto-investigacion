import axios from "axios";
import { url } from "../../config";

export const createExperience = (body,config) => {
  return axios.post(`${url}/newExperience`, body,config);
};
export const getExperiences = (config) => {
  return axios.get(`${url}/getExperiences`, config);
};
