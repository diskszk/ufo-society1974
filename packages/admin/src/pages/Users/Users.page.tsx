import { useFetch } from "../../hooks/api";
import { BackButton } from "../../components/UIKit";
import { fetchUsers } from "../../lib/users";
import { UserList } from "../../partials/UserList";
import { useSignedInUserState } from "../../hooks/useSignedInUserState";
import { ROLE } from "../../constants";

export const Users: React.FC = () => {
  const { signedInUser } = useSignedInUserState();
  const isApproved = signedInUser.role === ROLE.MASTER;

  const { data: users } = useFetch(["users"], fetchUsers);

  return (
    <div className="page">
      <h1>ユーザー管理ページ</h1>
      {users ? (
        <UserList users={users} isApproved={isApproved} />
      ) : (
        <div>
          <p>ユーザーが存在しません。</p>
        </div>
      )}
      <div className="button-container-row">
        <BackButton>もどる</BackButton>
      </div>
    </div>
  );
};
