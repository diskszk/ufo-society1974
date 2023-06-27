import { useCallback, useEffect } from "react";
import { StyledContent } from "./styles";
import { Button } from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { ModalStatus, RootStore } from "../../../types";
import { createCloseModalAction } from "../../../store/ModalStatusReducer";
import { useNavigate } from "react-router-dom";

type ComponentProps = {
  errorMessage: string;
  handleClickClose: () => void;
};

export const Component: React.FC<ComponentProps> = ({
  errorMessage,
  handleClickClose,
}) => (
  <StyledContent>
    <h3>{errorMessage}</h3>
    <br />
    <Button label="とじる" handleClick={handleClickClose} />
  </StyledContent>
);

export const ErrorModalContent: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errorMessage } = useSelector<RootStore, ModalStatus>(
    (state) => state.modalStatus
  );

  const handleClickClose = useCallback(() => {
    dispatch(createCloseModalAction());

    navigate(-1);
  }, [dispatch, navigate]);

  const handleKeyDown = useCallback(
    (ev: KeyboardEvent) => {
      ev.preventDefault();

      if (ev.key === "Escape") {
        dispatch(createCloseModalAction());

        navigate(-1);
      }
    },
    [dispatch, navigate]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false);
  }, [handleKeyDown]);

  return (
    <Component
      errorMessage={errorMessage}
      handleClickClose={handleClickClose}
    />
  );
};
