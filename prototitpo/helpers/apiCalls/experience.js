import axios from "axios";
import { url } from "../../config";

export const createExperience = (body) => {
  return axios.post(`${url}/newExperience`, body);
};
export const getExperiences = () => {
  return axios.get(`${url}/getExperiences`, );
};
