import { db } from "../../firebase";
import { File, PublishPlatform } from "../types";
import { Album } from "@ufo-society1974/types";
import { generateRandomStrings } from "../helpers/generateRandomStrings";

const albumsRef = db.collection("albums");

export const saveAlbum = async (
  title: string,
  imageFile: File,
  _description: string,
  _publishPlatform: PublishPlatform,
  publishedDate: string,
  albumId: string
): Promise<void> => {
  const id = albumId !== "new" ? albumId : generateRandomStrings();

  const data: Album = {
    id: id,
    publishedDate: publishedDate,
    title: title,
    image: imageFile.path,
    published: false,
  };

  await albumsRef.doc(id).set(data, { merge: true });
};
