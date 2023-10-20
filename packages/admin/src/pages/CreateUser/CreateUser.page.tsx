import React, { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { CreateUserForm } from "../../partials/CreateUserForm";
import { CreateUserInputs } from "../../schemas/createUserSchema";
import { useSignedInUserState } from "../../hooks/useSignedInUserState";
import { useCreateUser } from "../../hooks/useCreateUser";
import { ROLE } from "../../constants";
import { useMessageModalState } from "../../hooks/useMessageModalState";
import { useSignIn } from "../../hooks/useSignIn";

export const CreateUser: React.FC = () => {
  const history = useHistory();
  const { signedInUser } = useSignedInUserState();
  const { handleCreateUser } = useCreateUser();
  const { handleSignIn } = useSignIn();

  const { openMessageModalWithMessage } = useMessageModalState();

  const onSubmit: SubmitHandler<CreateUserInputs> = useCallback(
    async (data) => {
      try {
        await handleCreateUser(data, signedInUser.role);

        await handleSignIn(data.email, data.password);
      } catch {
        throw new Error("サインインに失敗しました。");
      }
    },
    [handleCreateUser, handleSignIn, signedInUser.role]
  );

  useEffect(() => {
    if (signedInUser) {
      if (signedInUser.role !== ROLE.MASTER) {
        openMessageModalWithMessage("このページへのアクセス権がありません。");
        history.push("/users");
      }
    }
  }, [openMessageModalWithMessage, signedInUser, history]);

  return (
    <div className="sign-up page">
      <h1>管理者登録</h1>

      <CreateUserForm onSubmit={onSubmit} role={signedInUser.role} />
    </div>
  );
};
