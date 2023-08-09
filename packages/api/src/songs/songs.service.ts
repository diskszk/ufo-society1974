import { Injectable } from "@nestjs/common";
import { firestore } from "firebase-admin";
import { Song } from "./song.entity";
import { PUBLISHED_ALBUMS, SONGS } from "../constants";
import { songConverter } from "./songs.converter";
import { CreateSongDTO } from "./songs.dto";

@Injectable()
export class SongsService {
  private readonly db: firestore.Firestore;
  private readonly albumsRef: firestore.CollectionReference<firestore.DocumentData>;

  constructor() {
    if (process.env.NODE_ENV === "test") {
      return;
    } else {
      this.db = firestore();
      this.albumsRef = this.db.collection(PUBLISHED_ALBUMS);
    }
  }

  async findIsAlbumExists(albumId: string): Promise<boolean> {
    const snapshot = await this.albumsRef.doc(albumId).get();
    if (snapshot.exists) {
      return true;
    }
    return false;
  }

  async findAllSongsByAlbumId(albumId: string): Promise<Song[]> {
    const songsRef = this.albumsRef.doc(albumId).collection(SONGS);

    const snapshots = await songsRef
      .orderBy("id")
      .withConverter(songConverter)
      .get();

    return snapshots.docs.map((snapshot) => {
      const doc = snapshot.data();

      return {
        ...doc,
      };
    });
  }

  async create(albumId: string, songDTO: CreateSongDTO) {
    const songRef = this.albumsRef.doc(albumId).collection(SONGS);

    return await songRef
      .withConverter<CreateSongDTO>(songConverter)
      .add({ ...songDTO });
  }

  async findSongById(albumId: string, songId: string): Promise<Song | null> {
    const songRef = this.albumsRef.doc(albumId).collection(SONGS).doc(songId);

    const snapshot = await songRef.withConverter(songConverter).get();

    if (!snapshot.exists) {
      return null;
    }

    const doc = snapshot.data();

    return { ...doc };
  }

  async delete(albumId: string, songId: string) {
    const songRef = this.albumsRef.doc(albumId).collection(SONGS).doc(songId);

    return await songRef.delete();
  }
}
