import { SongForm } from "../../partials/SongForm/SongForm";

/*
  /albums/detail/:id?status={draft|published}/edit/:songId 
*/
export const EditSong: React.FC = () => {
  return (
    <div>
      <h1>曲を追加・編集</h1>

      <SongForm isApproved={true} />
    </div>
  );
};
