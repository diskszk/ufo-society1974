import { ReactNode } from "react";
import { StyledButton } from "./CustomButton";
import { useHistory } from "react-router-dom";

type Props = {
  children: ReactNode;
};
export const BackButton: React.FC<Props> = ({ children }) => {
  const { goBack } = useHistory();

  return <StyledButton onClick={() => goBack()}>{children}</StyledButton>;
};
