import { StyledHeading, StyledErrorParagraph } from "./styles";

export const UndefinedPage: React.FC = () => {
  return (
    <div>
      <StyledHeading>404 Page Not Found</StyledHeading>
      <StyledErrorParagraph>
        お探しのページは見つかりませんでした。
      </StyledErrorParagraph>
    </div>
  );
};
