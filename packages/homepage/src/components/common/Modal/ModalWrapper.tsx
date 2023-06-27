import { ReactNode } from "react";
import { StyledContainer, StyledModal } from "./styles";
import { LoadingModalContent } from "./LoadingModalContent";
import { ErrorModalContent } from "./ErrorModalContent";
import { useSelector } from "react-redux";
import { RootStore, ModalStatus } from "../../../types";

type ComponentProps = {
  children: ReactNode;
};
export const Component: React.FC<ComponentProps> = ({ children }) => (
  <StyledContainer data-testid="modal">
    <StyledModal>{children}</StyledModal>
  </StyledContainer>
);

// ErrorMessage / LyricNote / Loading...
export const ModalWrapper: React.FC = () => {
  const { isOpen, modalType } = useSelector<RootStore, ModalStatus>(
    (state) => state.modalStatus
  );

  if (!isOpen) {
    return null;
  }

  if (modalType === "ERROR") {
    return (
      <Component>
        <ErrorModalContent />
      </Component>
    );
  } else if (modalType === "LOADING") {
    return (
      <Component>
        <LoadingModalContent />
      </Component>
    );
  } else {
    return null;
  }
};
