import { render, screen } from "@testing-library/react";
import { Wrapper } from "../../test-utils";
import { Albums } from "./Albums.page";
import { setupCurrentUser } from "../../test-utils/currentUser";
import { RoleType } from "../../constants";

const setup = async (role: RoleType) => {
  await setupCurrentUser(role);

  render(
    <Wrapper>
      <Albums />
    </Wrapper>
  );
};

test("権限がeditorの場合、アルバムを新規作成ボタンを表示する", async () => {
  await setup("editor");

  const addIcon = screen.getByText("アルバムを追加");

  expect(addIcon).toBeInTheDocument();
});

test("権限がeditorでない場合、アルバムを新規作成ボタンを表示しない", async () => {
  await setup("master");
  const addIcon = screen.queryByText("アルバムを追加");

  expect(addIcon).not.toBeInTheDocument();
});
