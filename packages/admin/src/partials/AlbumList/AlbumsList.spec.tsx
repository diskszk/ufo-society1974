import { render, screen } from "@testing-library/react";
import { AlbumList } from "./AlbumList";
import { createMockAlbum } from "@ufo-society1974/factories";
import { Wrapper } from "../../test-utils";

const testData = [createMockAlbum("01")];

test("権限がeditorの場合、`編集する`という文言を表示する", () => {
  render(
    <Wrapper>
      <AlbumList role="editor" albums={testData} />
    </Wrapper>
  );

  expect(screen.getByText("アルバムを編集する")).toBeInTheDocument();
  expect(screen.getByText("アルバムの曲を編集する")).toBeInTheDocument();
});

test("権限がmasterの場合、`閲覧する`という文言を表示する", () => {
  render(
    <Wrapper>
      <AlbumList role="master" albums={testData} />
    </Wrapper>
  );

  expect(screen.getByText("アルバムを閲覧する")).toBeInTheDocument();
  expect(screen.getByText("アルバムの曲を閲覧する")).toBeInTheDocument();
});

test("権限がwatcherの場合、`閲覧する`という文言を表示する", () => {
  render(
    <Wrapper>
      <AlbumList role="watcher" albums={testData} />
    </Wrapper>
  );

  expect(screen.getByText("アルバムを閲覧する")).toBeInTheDocument();
  expect(screen.getByText("アルバムの曲を閲覧する")).toBeInTheDocument();
});
