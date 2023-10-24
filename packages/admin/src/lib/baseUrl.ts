import { WEB_API_BASE_URL } from "../constants";

export const baseUrl = (path: string) => {
  return WEB_API_BASE_URL + path;
};
