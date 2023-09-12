import firebase from "firebase/app";
import { ERROR_MESSAGE } from "../constants";

export const storage = firebase.storage();
export const imagesRef = storage.ref("images");

export async function uploadImage(
  file: File,
  filename: string
): Promise<{ downLoadURL: string }> {
  const uploadRef = imagesRef.child(filename);

  try {
    const snapshot = await uploadRef.put(file);
    const downLoadURL: string = await snapshot.ref.getDownloadURL();

    return { downLoadURL };
  } catch {
    throw new Error(
      `${ERROR_MESSAGE.serverError}
      画像のアップロードに失敗しました。`
    );
  }
}
