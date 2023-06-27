import { Link, useLocation } from "react-router-dom";
import { StyledHeading } from "./styles";
import { fetchAlbum } from "../lib";
import { useFetch } from "../hooks/useFetch";
import { SongListTable } from "../components/model/songs/SongListTable";
import { AlbumDisplay } from "../components/model/albums/AlbumDisplay";
import { useQuery } from "@tanstack/react-query";
import { Song, Album } from "../types";
import { SongModal } from "../components/model/songs/SongModal";
import { ALT_IMAGE_PATH } from "../constants";
import { ModalWrapper } from "../components/common/Modal/ModalWrapper";

export const AlbumDetailPage: React.FC = () => {
  const location = useLocation();
  const albumId = location.pathname.split("/")[2];

  const { data } = useFetch(["album", albumId], () => fetchAlbum(albumId));

  const { data: modalData } = useQuery<{ isOpen: boolean; song: Song | null }>(
    ["lyric-modal-data"],
    {
      enabled: false,
      initialData: { isOpen: false, song: null },
    }
  );

  let album: Album | undefined;

  if (data?.album) {
    if (
      !data.album.imageFile ||
      !data.album.imageFile.filename ||
      !data.album.imageFile.path
    ) {
      album = {
        ...data.album,
        imageFile: {
          filename: "",
          path: ALT_IMAGE_PATH,
        },
      };
    } else {
      album = data.album;
    }
  }

  return (
    <>
      <ModalWrapper />
      <div className="space-bottom">
        {modalData.isOpen && modalData.song && (
          <SongModal song={modalData.song} />
        )}
        <StyledHeading>{album?.title}</StyledHeading>
        {album && <AlbumDisplay album={album} />}
        {data && <SongListTable albumInfo={data.info} />}
        <br />
        <Link to="/">もどる</Link>
      </div>
    </>
  );
};
