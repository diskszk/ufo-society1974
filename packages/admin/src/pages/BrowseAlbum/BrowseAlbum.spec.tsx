import { render, screen } from "@testing-library/react";
import { BrowseAlbum } from "./BrowseAlbum.page";
import { WrapperWithFetch as Wrapper } from "../../test-utils";

const id = "album-id-published-01";

const renderUi = () => {
  render(
    <Wrapper memoryRouterOptions={{ initialEntries: [`/albums/browse/${id}`] }}>
      <BrowseAlbum />
    </Wrapper>
  );
};

test.each`
  label
  ${"アルバムタイトル"}
  ${"公開日(YYYY-MM-DD)"}
`("$labelへの入力は不可能である", async ({ label }) => {
  renderUi();

  expect(await screen.findByRole("textbox", { name: label })).toHaveAttribute(
    "readonly"
  );
});

test.each`
  label
  ${"画像を選択する"}
  ${"保存する"}
`("$labelボタンはクリック不可能である", async ({ label }) => {
  renderUi();

  expect(await screen.findByRole("button", { name: label })).toBeDisabled();
});
