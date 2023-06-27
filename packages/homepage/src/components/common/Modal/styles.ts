import styled from "styled-components";

// 画面全体を覆う設定
export const StyledContainer = styled.div({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, .6)",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "auto",
});

export const StyledModal = styled.div({
  top: "30%",
  marginBottom: "48px",
  width: "80%",
  padding: "16px",
  backgroundColor: "rgba(238, 238, 238, .9)",
  minHeight: "240px",
  borderRadius: "16px",
});

export const StyledContent = styled.div({
  margin: "52px 0",
  whiteSpace: "pre-wrap",
});
