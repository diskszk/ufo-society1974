import { render, renderHook, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { RoleType, Status } from "../../types";
import { WrapperWithFetch as Wrapper } from "../../test-utils";
import { AlbumDetail } from "./AlbumDetail.page";
import { useSignedInUserState } from "../../hooks/useSignedInUserState";
import { createMockUser } from "@ufo-society1974/factories";
import * as draftAlbumsModule from "../../lib/draftAlbums";
import * as publishedAlbumsModule from "../../lib/publishedAlbums";

const user = userEvent.setup();

const albumId = "album-01";
const renderUi = (role: RoleType, status: Status) => {
  const { result } = renderHook(() => useSignedInUserState(), {
    wrapper: Wrapper,
  });

  result.current.setSignedInUser(createMockUser("01", { role }));

  render(
    <Wrapper
      memoryRouterOptions={{
        initialEntries: [`/albums/${status}/${albumId}/detail`],
      }}
    >
      <AlbumDetail />
    </Wrapper>
  );
};

test("roleがeditorかつ、urlに`edit`を含む場合、`アルバムを公開する`ボタンを表示する", async () => {
  renderUi("editor", "edit");

  expect(
    await screen.findByRole("button", { name: "アルバムを公開する" })
  ).toBeInTheDocument();
});

test("roleがeditorかつ、urlに`preview`を含む場合、`アルバムを非公開にする`ボタンを表示する", async () => {
  renderUi("editor", "preview");

  expect(
    await screen.findByRole("button", { name: "アルバムを非公開にする" })
  ).toBeInTheDocument();
});
test("roleがmasterかつ、urlに`edit`を含む場合、アルバムの公開ステータスを変更するボタンを表示しない", async () => {
  renderUi("master", "edit");

  expect(
    screen.queryByRole("button", { name: /アルバムを/ })
  ).not.toBeInTheDocument();
});
test("roleがmasterかつ、urlに`preview`を含む場合、アルバムの公開ステータスを変更するボタンを表示しない", async () => {
  renderUi("master", "preview");

  expect(
    screen.queryByRole("button", { name: /アルバムを/ })
  ).not.toBeInTheDocument();
});

describe("ステータス変更ボタンのテスト", () => {
  beforeEach(() => {
    global.window.confirm = jest.fn(() => true);
  });

  test("`アルバムを公開する`ボタンをクリックすると、publish関数が発火する", async () => {
    const spiedPublish = jest.spyOn(draftAlbumsModule, "publish");
    renderUi("editor", "edit");

    const button = await screen.findByRole("button", {
      name: "アルバムを公開する",
    });

    await user.click(button);

    expect(spiedPublish).toHaveBeenCalledTimes(1);

    spiedPublish.mockClear();
  });

  test("`アルバムを非公開にする`ボタンをクリックすると、unpublish関数が発火する", async () => {
    const spiedUnpublish = jest.spyOn(publishedAlbumsModule, "unpublish");

    renderUi("editor", "preview");

    const button = await screen.findByRole("button", {
      name: "アルバムを非公開にする",
    });

    await user.click(button);

    expect(spiedUnpublish).toHaveBeenCalledTimes(1);

    spiedUnpublish.mockClear();
  });
});
