import { v4 as uuid } from "uuid";
import firebase from "firebase/app";
import { ERROR_MESSAGE } from "../constants";

export const storage = firebase.storage();
export const imagesRef = storage.ref("images");

export async function uploadImage(
  fileList: FileList
): Promise<{ downLoadURL: string }> {
  const file = fileList[0];

  const filename = uuid();
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
