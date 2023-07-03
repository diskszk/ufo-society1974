import styled from "styled-components";

const StyledHeader = styled.header({
  marginTop: "16px",
});

export const Header: React.FC = () => {
  const topPageUrl = "/";

  return (
    <StyledHeader>
      <a href={topPageUrl}>トップページ</a>
    </StyledHeader>
  );
};
