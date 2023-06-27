/* eslint-disable import/no-default-export */

import { ComponentMeta } from "@storybook/react";
import { Component as ModalWrapper } from "./ModalWrapper";
import { Component as ErrorModalContent } from "./ErrorModalContent";
import { LoadingModalContent } from "./LoadingModalContent";

export default {
  title: "components/modals",
  component: ModalWrapper,
} as ComponentMeta<typeof ModalWrapper>;

export const ErrorModal = () => {
  return (
    <ModalWrapper>
      <ErrorModalContent
        errorMessage="404エラー"
        handleClickClose={() => void 0}
      />
    </ModalWrapper>
  );
};

export const LoadingModal = () => {
  return (
    <ModalWrapper>
      <LoadingModalContent />
    </ModalWrapper>
  );
};
