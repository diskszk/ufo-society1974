import { useCallback } from "react";
import { User } from "../../types";
import { TableCell, TableRow } from "@mui/material";
import { useMessageModalState } from "../../hooks/useMessageModalState";
import { ROLE } from "../../constants";
import { useHandleUser } from "../../hooks/useHandleUser";

type Props = {
  user: User;
  isApproved: boolean;
};
export const UserListItem: React.FC<Props> = ({ user, isApproved }) => {
  const { openMessageModalWithMessage } = useMessageModalState();
  const { handleDelete } = useHandleUser();

  // role:masterのみ削除可能
  const handleClick = useCallback(async () => {
    if (!isApproved) {
      openMessageModalWithMessage("権限がありません。");
      return;
    }
    if (user.role === ROLE.MASTER) {
      openMessageModalWithMessage("MASTER権限のユーザーは削除できません。");
      return;
    }

    if (!window.confirm(`${user.username}を削除しますか？`)) {
      return;
    }
    await handleDelete(user.uid);
  }, [
    handleDelete,
    isApproved,
    openMessageModalWithMessage,
    user.role,
    user.uid,
    user.username,
  ]);
  return (
    <TableRow key={user.uid}>
      <TableCell component="th" scope="row">
        {user.uid}
      </TableCell>
      <TableCell>{user.username}</TableCell>
      <TableCell>{user.role}</TableCell>
      {isApproved && (
        <TableCell
          sx={{
            cursor: "pointer",
          }}
          role="button"
          onClick={handleClick}
        >
          削除
        </TableCell>
      )}
    </TableRow>
  );
};
