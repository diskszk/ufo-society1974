import { screen, render, cleanup } from "@testing-library/react";
import { Wrapper } from "../../test-utils";
import { ImageUploadForm } from "./ImageUploadForm";
import { AlbumInput } from "../../lib/schemas/albumSchema";
import userEvent from "@testing-library/user-event";
import { createMockAlbum } from "@ufo-society1974/factories";

const getMockValue = (): AlbumInput => {
  const album = createMockAlbum("01", { image: "good-morning.png" });
  return { ...album, imageFile: album.image };
};

const setup = ({
  isApproved,
  currentValues,
}: {
  isApproved: boolean;
  currentValues?: AlbumInput;
}) => {
  const props = {
    setValue: jest.fn(),
    isApproved,
    currentValues,
  };

  render(
    <Wrapper>
      <ImageUploadForm {...props} />
    </Wrapper>
  );
};

beforeEach(() => {
  URL.createObjectURL = jest.fn(() => "generated-hello.png");
});

afterEach(() => {
  cleanup();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  URL.createObjectURL.mockReset();
});

const user = userEvent.setup();

describe("初期状態では`アップロード`ボタンを表示しない", () => {
  test("新規作成の場合", () => {
    setup({ isApproved: true });

    expect(
      screen.queryByRole("button", { name: "アップロード" })
    ).not.toBeInTheDocument();
  });
  test("編集の場合", () => {
    setup({ isApproved: true, currentValues: getMockValue() });

    expect(
      screen.queryByRole("button", { name: "アップロード" })
    ).not.toBeInTheDocument();
  });
});

test("許可されたユーザーでない場合、画像を選択するボタンは非活性である", () => {
  setup({ isApproved: false });

  expect(screen.getByRole("button", { name: "画像を選択する" })).toBeDisabled();
});

describe("画像を選択すると、`アップロード`ボタンを表示する", () => {
  test("新規作成の場合", async () => {
    setup({ isApproved: true });

    const file = new File(["hello"], "hello.png", { type: "image/png" });

    const input = screen.getByLabelText("file-uploader");

    await user.upload(input, file);

    expect(
      screen.getByRole("button", { name: "アップロード" })
    ).toBeInTheDocument();
  });

  test("編集の場合", async () => {
    setup({ isApproved: true, currentValues: getMockValue() });

    const file = new File(["hello"], "hello.png", { type: "image/png" });

    const input = screen.getByLabelText("file-uploader");

    await user.upload(input, file);

    expect(
      screen.getByRole("button", { name: "アップロード" })
    ).toBeInTheDocument();
  });
});

test("編集の場合、最初から画像が表示されている", async () => {
  setup({
    isApproved: true,
    currentValues: getMockValue(),
  });

  expect(screen.getByRole("img").getAttribute("src")).toBeTruthy();
});
