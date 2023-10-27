import { useFetch } from "../../hooks/api";
import { BackButton } from "../../components/UIKit";
import { fetchUsers } from "../../lib/users";
import { UserList } from "../../partials/UserList";

export const Users: React.FC = () => {
  const { data: users } = useFetch(["users"], fetchUsers);

  return (
    <div className="page">
      <h1>ユーザー管理ページ</h1>
      {users ? (
        <UserList users={users} />
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
