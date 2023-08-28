import { useCallback } from "react";
import { StyledButton } from "../../components/UIKit/CustomButton";
import { ROLE } from "../../constants";
import { useSignedInUserState } from "../../hooks/useSignedInUserState";
import { AddIconButton } from "../../components/AddIconButton";

export const Albums: React.FC = () => {
  const { signedInUser } = useSignedInUserState();

  const handleClickPublish = useCallback(() => {
    // 権限確認
    // confirm
    // http fetch
    // 結果表示
    return;
  }, []);

  const isApprovedUser = signedInUser.role === ROLE.EDITOR;

  return (
    <div className="page">
      <h1>アルバムの管理ページ</h1>
      <div className="spacing-div"></div>

      <div className="spacing-div"></div>

      <div className="album-container">
        <div className="add-icon-button">
          {isApprovedUser && (
            <AddIconButton label="アルバムを追加" href="/albums/create" />
          )}
        </div>

        {/* 公開中と未公開で分ける */}
        {/* <AlbumTable /> */}

        <div className="spacing-div"></div>

        <div className="button-container-row">
          <StyledButton href="/">もどる</StyledButton>
          <StyledButton disabled={!isApprovedUser} onClick={handleClickPublish}>
            公開する
          </StyledButton>
        </div>
      </div>
    </div>
  );
};
