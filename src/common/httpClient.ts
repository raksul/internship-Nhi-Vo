import axios from "axios";
import API_PATH from "@/common/constants";

const httpClient = (baseURL: string = API_PATH) =>
  axios.create({
    baseURL,
  });

export const httpClientRoot = httpClient("/");
export default httpClient();
