import imgClient from "../common/imgClient";

export const uploadImage = (file: Blob) => {
  return imgClient.post("/", file);
};
