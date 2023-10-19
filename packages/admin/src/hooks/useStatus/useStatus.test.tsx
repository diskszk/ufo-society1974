import { renderHook } from "@testing-library/react";
import { useStatus } from ".";
import { Wrapper } from "../../test-utils";
import { ReactNode } from "react";

test("URLが`/*/edit/*`の場合、editを返す", () => {
  const { result } = renderHook(() => useStatus(), {
    wrapper: ({ children }: { children: ReactNode }) => (
      <Wrapper memoryRouterOptions={{ initialEntries: ["/albums/edit/"] }}>
        {children}
      </Wrapper>
    ),
  });

  const { status } = result.current[0]();

  expect(status).toBe("edit");
});

test("URLが`/*/preview/*`の場合、previewを返す", () => {
  const { result } = renderHook(() => useStatus(), {
    wrapper: ({ children }: { children: ReactNode }) => (
      <Wrapper memoryRouterOptions={{ initialEntries: ["/albums/preview/"] }}>
        {children}
      </Wrapper>
    ),
  });

  const { status } = result.current[0]();

  expect(status).toBe("preview");
});

test("URLが`/hoge/fuga/`の場合、エラーが発生する", () => {
  const { result } = renderHook(() => useStatus(), {
    wrapper: ({ children }: { children: ReactNode }) => (
      <Wrapper memoryRouterOptions={{ initialEntries: ["/hoge/fuga/"] }}>
        {children}
      </Wrapper>
    ),
  });

  expect(() => result.current[0]()).toThrow("URLが正しくありません。");
});
