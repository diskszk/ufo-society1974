import { render, screen } from "@testing-library/react";
import { Wrapper } from "../../test-utils";
import { SongListItem } from "./SongListItem";
import { createMockSong } from "@ufo-society1974/factories";
import { getApproved } from "../../lib/helpers/getApproved";
import { RoleType, Status } from "../../types";

const albumId = "album-id";
const songId = "song-id";
const song = createMockSong(songId);

const renderUi = ({
  currentUserRole,
  status,
}: {
  currentUserRole: RoleType;
  status: Status;
}) => {
  const isApproved = getApproved({
    currentUserRole,
    approvedRole: "editor",
    status,
  });

  render(
    <Wrapper>
      <table>
        <tbody>
          <SongListItem
            song={song}
            albumId={albumId}
            isApproved={isApproved}
            status={status}
          />
        </tbody>
      </table>
    </Wrapper>
  );
};

describe("リンクの文字", () => {
  test("ユーザーのロールがeditorかつURLが`/albums/edit/`を含む場合、リンクの文字は`編集`になる", () => {
    renderUi({ currentUserRole: "editor", status: "edit" });

    expect(screen.getByRole("link")).toHaveTextContent("編集");
  });

  test("ユーザーのロールがeditorかつURLが`/albums/preview/`を含む場合、リンクの文字は`閲覧`になる", () => {
    renderUi({ currentUserRole: "editor", status: "preview" });

    expect(screen.getByRole("link")).toHaveTextContent("閲覧");
  });

  test("ユーザーのロールがmasterかつURLが`/albums/edit/`を含む場合、リンクの文字は`閲覧`になる", () => {
    renderUi({ currentUserRole: "master", status: "edit" });

    expect(screen.getByRole("link")).toHaveTextContent("閲覧");
  });

  test("ユーザーのロールがmasterかつURLが`/albums/preview/`を含む場合、リンクの文字は`閲覧`になる", () => {
    renderUi({ currentUserRole: "master", status: "preview" });

    expect(screen.getByRole("link")).toHaveTextContent("閲覧");
  });
});

describe("リンク先のURL", () => {
  test("ユーザーのロールがeditorかつURLが`/albums/edit/`を含む場合、リンク先のURLは`/albums/edit/:albumId/detail/:songId`である", () => {
    renderUi({ currentUserRole: "editor", status: "edit" });

    expect(screen.getByRole("link", { name: "編集" })).toHaveAttribute(
      "href",
      "/albums/edit/album-id/detail/song-id"
    );
  });

  test("ユーザーのロールがeditorかつURLが`/albums/preview/`を含む場合、リンク先のURLは`/albums/preview/:albumId/detail/:songId`である", async () => {
    renderUi({ currentUserRole: "editor", status: "preview" });

    expect(screen.getByRole("link", { name: "閲覧" })).toHaveAttribute(
      "href",
      "/albums/preview/album-id/detail/song-id"
    );
  });

  test("ユーザーのロールがmasterかつURLが`/albums/edit/`を含む場合、リンク先のURLは`/albums/edit/:albumId/detail/:songId`である", async () => {
    renderUi({ currentUserRole: "master", status: "edit" });

    expect(screen.getByRole("link", { name: "閲覧" })).toHaveAttribute(
      "href",
      "/albums/edit/album-id/detail/song-id"
    );
  });

  test("ユーザーのロールがmasterかつURLが`/albums/preview/`を含む場合、リンク先のURLは`/albums/preview/:albumId/detail/:songId`である", async () => {
    renderUi({ currentUserRole: "master", status: "preview" });
    expect(screen.getByRole("link", { name: "閲覧" })).toHaveAttribute(
      "href",
      "/albums/preview/album-id/detail/song-id"
    );
  });
});
