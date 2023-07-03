import { StyledButton, StyledSpan } from "./styles";

type Props = {
  label: string;
  handleClick: () => void;
};

export const Button: React.FC<Props> = ({ label, handleClick }) => {
  return (
    <StyledButton onClick={handleClick}>
      <StyledSpan>{label}</StyledSpan>
    </StyledButton>
  );
};
