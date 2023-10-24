import { StyledButton } from "./UIKit";

type Props = {
  message: string;
  handleClickCloseModal: () => void;
};

export const Modal: React.FC<Props> = ({ message, handleClickCloseModal }) => (
  <div className="modal-overlay" role="dialog" aria-modal="true" tabIndex={-1}>
    <div className="modal-content">
      <h3>{message}</h3>
      <div className="spacing-div" />
      <div className="spacing-div" />
      <StyledButton onClick={handleClickCloseModal}>閉じる</StyledButton>
    </div>
  </div>
);
