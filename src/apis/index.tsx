import axios from "axios";
import { REACT_APP_API_HOST } from "../../global_variables";

const axiosInstance = axios.create(
    {
        baseURL : REACT_APP_API_HOST
    }
)

export default axiosInstance