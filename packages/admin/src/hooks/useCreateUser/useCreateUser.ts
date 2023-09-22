import { CreateUserInputs } from "../../lib/schemas/createUserSchema";
import { useMutation } from "@tanstack/react-query";
import { createUserInFirebase } from "../../lib/auth";
import { registerUser } from "../../lib/users";
import { useMessageModalState } from "../useMessageModalState";
import { ERROR_MESSAGE, ROLE, RoleType } from "../../constants";
import { User } from "../../lib/types";

export function useCreateUser() {
  const { openMessageModalWithMessage } = useMessageModalState();

  const { mutateAsync: createUserMutate } = useMutation(
    ({ email, password }: { email: string; password: string }) =>
      createUserInFirebase(email, password)
  );

  const { mutateAsync: registerAccountMutate } = useMutation((user: User) =>
    registerUser(user)
  );

  const handleCreateUser = async (
    inputData: CreateUserInputs,
    role: RoleType
  ) => {
    if (role !== ROLE.MASTER) {
      openMessageModalWithMessage("権限がありません。");
      return;
    }

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

  return { handleCreateUser };
}
