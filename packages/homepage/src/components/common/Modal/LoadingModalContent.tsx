import { CircularProgress } from "@mui/material";
import { StyledContent } from "./styles";

export const LoadingModalContent: React.FC = () => {
  return (
    <StyledContent>
      <CircularProgress disableShrink size={80} />
      <p>Loading...</p>
    </StyledContent>
  );
};
