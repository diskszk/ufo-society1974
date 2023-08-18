import { renderHook, waitFor } from "@testing-library/react";
import { Wrapper } from ".";
import { useSignedInUserState } from "../hooks/useSignedInUserState";
import { User } from "@ufo-society1974/types";

export const setupCurrentUser = async (role: string) => {
  const { result } = renderHook(() => useSignedInUserState(), {
    wrapper: Wrapper,
  });

  const user: User = {
    uid: "testuid",
    username: "test user",
    email: "test@example.com",
    role,
    isDeleted: false,
  };

  let currentUser = result.current.signedInUser;

  result.current.setSignedInUser(user);
  await waitFor(() => {
    currentUser = result.current.signedInUser;
    expect(currentUser.username).toBe("test user");
  });

  return { currentUser };
};
