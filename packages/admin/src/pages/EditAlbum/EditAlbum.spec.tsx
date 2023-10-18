import { render, screen } from "@testing-library/react";
import { WrapperWithFetch as Wrapper } from "../../test-utils";
import { EditAlbum } from "./EditAlbum.page";
import { createMockUser } from "@ufo-society1974/factories";

import * as useSignInUserStateModule from "../../hooks/useSignedInUserState";
import { Status } from "../../types";

const albumId = "album-id-draft-01";

const spy = jest.spyOn(useSignInUserStateModule, "useSignedInUserState");

afterEach(() => {
  spy.mockRestore();
});

const renderUi = (status: Status) => {
  render(
    <Wrapper
      memoryRouterOptions={{ initialEntries: [`/albums/${status}/${albumId}`] }}
    >
      <EditAlbum />
    </Wrapper>
  );
};

test("ユーザーロールが`editor`かつ、URLが`/albums/edit/`を含む場合、`アルバムを編集`という文字を表示する", async () => {
  spy.mockImplementation(() => {
    return {
      ...jest.requireActual("../../hooks/useSignedInUserState"),
      signedInUser: createMockUser("01", { role: "editor" }),
    };
  });

  renderUi("edit");
  const label = await screen.findByText("アルバムを編集");
  expect(label).toBeInTheDocument();
});

test("ユーザーロールが`editor`かつ、URLが`/albums/preview/`を含む場合、`アルバムを閲覧`という文字を表示する", async () => {
  spy.mockImplementation(() => {
    return {
      ...jest.requireActual("../../hooks/useSignedInUserState"),
      signedInUser: createMockUser("01", { role: "editor" }),
    };
  });

  renderUi("preview");

  const label = await screen.findByText("アルバムを閲覧");
  expect(label).toBeInTheDocument();
});

test("ユーザーロールが`master`かつ、URLが`/albums/edit/`を含む場合、`アルバムを閲覧`という文字を表示する", async () => {
  spy.mockImplementation(() => {
    return {
      ...jest.requireActual("../../hooks/useSignedInUserState"),
      signedInUser: createMockUser("02", { role: "master" }),
    };
  });

  renderUi("edit");
  const label = await screen.findByText("アルバムを閲覧");
  expect(label).toBeInTheDocument();
});

test("ユーザーロールが`master`かつ、URLが`/albums/preview/`を含む場合、`アルバム閲覧`という文字を表示する", async () => {
  spy.mockImplementation(() => {
    return {
      ...jest.requireActual("../../hooks/useSignedInUserState"),
      signedInUser: createMockUser("02", { role: "master" }),
    };
  });

  renderUi("preview");
  const label = await screen.findByText("アルバムを閲覧");
  expect(label).toBeInTheDocument();
});
