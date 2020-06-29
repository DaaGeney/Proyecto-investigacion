import axios from "axios"; 
import { url } from "../../config";

export const createGamificationComponent = (body) => {
    return axios.post(`${url}/newComponent/GamificationComponent`, body);
  };