import { firestore } from "firebase-admin";
import { Album } from "./album.entity";
import { CreateAlbumDTO, UpdateAlbumDTO } from "./albums.dto";

export const albumConverter = {
  toFirestore(album: CreateAlbumDTO | UpdateAlbumDTO): firestore.DocumentData {
    return {
      ...album,
      published: false, // 新規作成時は非公開
    };
  },
  fromFirestore(
    snapshot: firestore.QueryDocumentSnapshot<firestore.DocumentData>
  ): Album {
    const data = snapshot.data();

    return {
      id: snapshot.id,
      image: data.imageFile,
      publishedDate: data.publishedDate,
      title: data.title,
      published: data.published,
    };
  },
};
