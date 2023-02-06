import AxiosConfig from './axiosConfig';
import { excelUrl } from "./config";

export default new AxiosConfig(excelUrl).getInstance();