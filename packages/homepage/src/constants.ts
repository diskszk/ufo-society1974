import altImage from "./assets/images/no_image.jpg";

export const ALT_IMAGE_PATH = altImage;

export const MIN_WIDTH = "960px";

const WEB_API_PROD_URL =
  "https://asia-northeast2-ufo-society-1974.cloudfunctions.net/api";

const WEB_API_DEV_URL =
  "http://127.0.0.1:5001/ufo-society-1974/asia-northeast2/api";

export const WEB_API_BASE_URL =
  process.env.NODE_ENV === "production" ? WEB_API_PROD_URL : WEB_API_DEV_URL;
