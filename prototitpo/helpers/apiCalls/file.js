import axios from "axios";
import { url } from "../../config";


export const createFile = (body, typeComponent, nameComponent) => {
    let config = {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }

    return axios.post(`${url}/file/${typeComponent}/${nameComponent}`, body, config);
};

export const getPdf = () => {
    return axios.post(`${url}/file/getPdf`, { responseType: 'blob' });
};

export const retrievePDF = () => {
    let jsonRetrievePDF = {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    };
    return fetch(`${url}/file/getPdf`, jsonRetrievePDF);
};
