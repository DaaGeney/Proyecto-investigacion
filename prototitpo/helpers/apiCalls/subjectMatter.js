import axios from "axios";
import { url } from "../../config";

export const createSubject = (body) => {
  return axios.post(`${url}/newSubject`, body);
};
export const getSubjects = () => {
  return axios.get(`${url}/getSubjects`);
};

