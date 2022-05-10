import axios from "axios";
import * as Constants from "../common/constants";

const httpClient = (baseURL: string = Constants.API_PATH) =>
  axios.create({
    baseURL,
  });

export default httpClient();
