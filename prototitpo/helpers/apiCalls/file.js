import axios from "axios";
import { url } from "../../config";


export const createFile = (body,typeComponent,nameComponent) => {
    let config = {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }

    return axios.post(`${url}/file/${typeComponent}/${nameComponent}`, body, config);
};
