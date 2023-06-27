import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider, useDispatch } from "react-redux";

import { store } from "../../../store/store";
import { ModalWrapper } from "./ModalWrapper";

import { ReactNode, useEffect } from "react";
import {
  createOpenErrorModalAction,
  createOpenLoadingModalAction,
} from "../../../store/ModalStatusReducer";

const Wrapper = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

const MockLoadingComponent: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createOpenLoadingModalAction());
  }, [dispatch]);

  return <ModalWrapper />;
};
// Navigatorモック準備
const mockedNavigator = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigator,
}));

const MockErrorComponent: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createOpenErrorModalAction("Something Error"));
  }, [dispatch]);

  return <ModalWrapper />;
};

describe("モーダルを表示/非表示する", () => {
  afterEach(() => cleanup());

  test("デフォルトの状態だとモーダルは表示しない", () => {
    render(
      <Wrapper>
        <ModalWrapper />
      </Wrapper>
    );

    expect(screen.queryByTestId("modal")).toBeFalsy();
  });

  test("Loadingモーダルを表示する", () => {
    render(
      <Wrapper>
        <MockLoadingComponent />
      </Wrapper>
    );

    expect(screen.getByTestId("modal")).toBeTruthy();
    expect(screen.getByText(/Loading.../)).toBeInTheDocument();
  });

  test("Errorモーダルを表示する", () => {
    render(
      <Wrapper>
        <MockErrorComponent />
      </Wrapper>
    );

    expect(screen.getByTestId("modal")).toBeTruthy();
    expect(screen.getByText(/Something Error/)).toBeInTheDocument();
  });

  test("Errorモーダルを表示しているとき、`とじる`ボタンをクリックするとモーダルを非表示にする", async () => {
    render(
      <Wrapper>
        <MockErrorComponent />
      </Wrapper>
    );

    const button = screen.getByRole("button");

    await userEvent.click(button);

    expect(screen.queryByTestId("modal")).toBeFalsy();
  });

  test("Errorモーダルを表示しているとき、`Escapeキー`を押下するとモーダルを非表示にする", async () => {
    render(
      <Wrapper>
        <MockErrorComponent />
      </Wrapper>
    );

    await userEvent.keyboard("{Escape}");
    expect(screen.queryByTestId("modal")).toBeFalsy();
  });
});
