import axios from "axios";
import { url } from "../../config";

export const createExperience = (body) => {
  return axios.post(`${url}/newExperience`, body);
};
