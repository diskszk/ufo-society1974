import React from "react";
import { Link } from "react-router-dom";
import { StyledButton } from "../components/UIKit";
import meido from "../assets/images/job_maid_meido_kissa.png";
import { useSignedInUserState } from "../hooks/useSignedInUserState";
import { CircularProgress } from "@mui/material";

type PresentationProps = {
  username: string;
};

export const Presentation: React.FC<PresentationProps> = ({ username }) => {
  return (
    <section className="home page">
      <h1>HOME</h1>
      <div className="spacing-div"></div>
      <div>
        <h2>
          おかえりなさいませ{" "}
          <span className="username">
            {username ? username : <CircularProgress />}
          </span>
          さま！
        </h2>
      </div>
      <div className="spacing-div"></div>

      <div>
        <img alt="メイドさん" src={meido} />
      </div>
      <div className="spacing-div"></div>
      <h2>ご注文はどちらになさいますか？</h2>

      <div className="spacing-div"></div>

      <div className="button-container">
        <Link to="/users">
          <StyledButton>ユーザー管理</StyledButton>
        </Link>
        <Link to="/albums">
          <StyledButton>アルバムを管理</StyledButton>
        </Link>
      </div>
    </section>
  );
};

export const Home: React.FC = () => {
  const { signedInUser } = useSignedInUserState();

  const { username } = signedInUser;

  return <Presentation username={username} />;
};
