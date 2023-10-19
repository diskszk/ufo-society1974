import UserTable from "../components/users/UserTable";
import { BackButton } from "../components/UIKit/BackButton";

export const Users: React.FC = () => {
  return (
    <section className="page">
      <h1>ユーザー管理ページ</h1>
      <div className="spacing-div"></div>
      <div className="spacing-div"></div>
      <UserTable />
      <div className="button-container-row">
        <BackButton>もどる</BackButton>
      </div>
    </section>
  );
};
