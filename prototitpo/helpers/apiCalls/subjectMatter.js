import axios from "axios";
import { url } from "../../config";

export const createSubject = (body,config) => {
  return axios.post(`${url}/newSubject`, body,config);
};
export const getSubjects = (config) => {
  return axios.get(`${url}/getSubjects`,config);
};

