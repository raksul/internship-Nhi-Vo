import axios from "axios";
import * as Constants from "../common/constants";

const imgClient = (baseURL: string = Constants.IMG_SERVICE_PATH) => {
  return axios.create({
    baseURL,
    headers: {
      Authorization: "Client-ID b824a3f2d3cab53",
      "Content-Type": "application/json",
    },
  });
};

export default imgClient();
