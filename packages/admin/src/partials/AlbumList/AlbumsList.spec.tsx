import { render, screen } from "@testing-library/react";
import { AlbumList } from "./AlbumList";
import { createMockAlbum } from "@ufo-society1974/factories";
import { Wrapper } from "../../test-utils";

const testData = [createMockAlbum("01")];

test("権限がeditorかつstatusがeditの場合、`編集する`という文言を表示する", () => {
  render(
    <Wrapper>
      <AlbumList role="editor" albums={testData} status="edit" />
    </Wrapper>
  );

  expect(screen.getByText("アルバムを編集する")).toBeInTheDocument();
  expect(screen.getByText("アルバムの詳細を編集する")).toBeInTheDocument();
});

test("権限がeditorかつstatusがpreviewの場合、`閲覧する`という文言を表示する", () => {
  render(
    <Wrapper>
      <AlbumList role="editor" albums={testData} status="preview" />
    </Wrapper>
  );

  expect(screen.getByText("アルバムを閲覧する")).toBeInTheDocument();
  expect(screen.getByText("アルバムの詳細を閲覧する")).toBeInTheDocument();
});

test("権限がmasterかつstatusがeditの場合、`閲覧する`という文言を表示する", () => {
  render(
    <Wrapper>
      <AlbumList role="master" albums={testData} status="edit" />
    </Wrapper>
  );

  expect(screen.getByText("アルバムを閲覧する")).toBeInTheDocument();
  expect(screen.getByText("アルバムの詳細を閲覧する")).toBeInTheDocument();
});

test("権限がmasterかつstatusがpreviewの場合、`閲覧する`という文言を表示する", () => {
  render(
    <Wrapper>
      <AlbumList role="master" albums={testData} status="preview" />
    </Wrapper>
  );

  expect(screen.getByText("アルバムを閲覧する")).toBeInTheDocument();
  expect(screen.getByText("アルバムの詳細を閲覧する")).toBeInTheDocument();
});
