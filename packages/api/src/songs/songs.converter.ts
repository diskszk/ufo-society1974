import { DocumentData } from "firebase-admin/firestore";
import { Song } from "./song.entity";

export const songConverter = {
  toFirestore(song: Song): DocumentData {
    return {
      lyric: song.lyric,
      title: song.title,
      wordsRights: song.wordsRights,
      musicRights: song.musicRights,
      createdAt: FirebaseFirestore.Timestamp.now(),
    };
  },
  fromFirestore(
    snapshot: FirebaseFirestore.QueryDocumentSnapshot<DocumentData>
  ): Song {
    const data = snapshot.data();

    return {
      id: snapshot.id,
      lyric: data.lyric,
      title: data.title,
      wordsRights: data.wordsRights,
      musicRights: data.musicRights,
    };
  },
};
