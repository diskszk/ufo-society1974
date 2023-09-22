import { renderHook, waitFor } from "@testing-library/react";
import { Wrapper } from ".";
import { useSignedInUserState } from "../hooks/useSignedInUserState";
import { createMockUser } from "@ufo-society1974/factories";
import { RoleType } from "../constants";

export const setupCurrentUser = async (role: RoleType) => {
  const { result } = renderHook(() => useSignedInUserState(), {
    wrapper: Wrapper,
  });

  const user = createMockUser("testuid", { username: "test user", role });

  let currentUser = result.current.signedInUser;

  result.current.setSignedInUser(user);
  await waitFor(() => {
    currentUser = result.current.signedInUser;
    expect(currentUser.username).toBe("test user");
  });

  return { currentUser };
};
