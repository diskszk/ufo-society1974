import { useCallback } from "react";
import { CreateUserInputs } from "../../schemas/createUserSchema";
import { useMutation } from "@tanstack/react-query";
import { createUserInFirebase } from "../../lib/auth";
import { registerUser, deleteUser } from "../../lib/users";
import { useMessageModalState } from "../useMessageModalState";
import { ERROR_MESSAGE } from "../../constants";
import { User } from "../../types";

type ReturnType = {
  handleDelete: (id: string) => Promise<void>;
  handleCreate: (inputData: CreateUserInputs) => Promise<void>;
};

export function useHandleUser(): ReturnType {
  const { openMessageModalWithMessage } = useMessageModalState();

  const { mutateAsync: createUserMutate } = useMutation(
    ({ email, password }: { email: string; password: string }) =>
      createUserInFirebase(email, password)
  );

  const { mutateAsync: registerAccountMutate } = useMutation((user: User) =>
    registerUser(user)
  );

  const handleCreate: ReturnType["handleCreate"] = async (
    inputData: CreateUserInputs
  ) => {
    try {
      const fbUser = await createUserMutate({
        email: inputData.email,
        password: inputData.password,
      });

      if (!fbUser) {
        openMessageModalWithMessage(ERROR_MESSAGE.serverError);
        return;
      }

      await registerAccountMutate({
        uid: fbUser.uid,
        username: inputData.username,
        role: inputData.roleType,
        email: inputData.email,
        isDeleted: false,
      });

      openMessageModalWithMessage(
        `${inputData.username}を作成しました。
          サインインし直します。`
      );
    } catch (error) {
      if (error instanceof Error) {
        openMessageModalWithMessage(error.message);
        return;
      }
    }
  };

  const { mutateAsync: deleteUserMutate } = useMutation(
    ({ id }: { id: string }) => deleteUser(id)
  );

  const handleDelete: ReturnType["handleDelete"] = useCallback(
    async (id) => {
      try {
        await deleteUserMutate({ id });
        openMessageModalWithMessage("ユーザーを削除しました。");
      } catch (error) {
        if (error instanceof Error) {
          openMessageModalWithMessage(error.message);
          return;
        }
      }
    },
    [deleteUserMutate, openMessageModalWithMessage]
  );

  return { handleCreate, handleDelete };
}
