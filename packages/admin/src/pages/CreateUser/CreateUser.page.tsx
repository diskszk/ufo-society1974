import React, { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { CreateUserForm } from "../../partials/CreateUserForm";
import { CreateUserInputs } from "../../schemas/createUserSchema";
import { useSignedInUserState } from "../../hooks/useSignedInUserState";
import { useHandleUser } from "../../hooks/useHandleUser";
import { ROLE } from "../../constants";
import { useMessageModalState } from "../../hooks/useMessageModalState";

export const CreateUser: React.FC = () => {
  const history = useHistory();
  const { signedInUser } = useSignedInUserState();
  const { handleCreate } = useHandleUser();

  const { openMessageModalWithMessage } = useMessageModalState();

  const onSubmit: SubmitHandler<CreateUserInputs> = useCallback(
    async (data) => {
      if (signedInUser.role !== ROLE.MASTER) {
        openMessageModalWithMessage("権限がありません。");
      }

      if (!data) {
        openMessageModalWithMessage("入力内容が正しくありません。");
      }

      try {
        await handleCreate(data);

        openMessageModalWithMessage(`${data.username}を作成しました。`);
        history.push("/users");
        return;
      } catch (error) {
        if (error instanceof Error) {
          openMessageModalWithMessage(error.message);
          return;
        }
      }
    },
    [handleCreate, history, openMessageModalWithMessage, signedInUser.role]
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
