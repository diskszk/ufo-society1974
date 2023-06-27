import altImage from "./assets/images/no_image.jpg";

export const ALT_IMAGE_PATH = altImage;

export const MIN_WIDTH = "960px";

export const WEB_API_BASE_URL = `${process.env.VITE_API_BASE_URL}/api` as const;
