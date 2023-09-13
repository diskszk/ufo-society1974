import firebase from "firebase/app";
import { ERROR_MESSAGE } from "../constants";

export async function uploadImage(
  file: File,
  filename: string
): Promise<{ downLoadURL: string }> {
  const storage = firebase.storage();
  const imagesRef = storage.ref("images");

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
