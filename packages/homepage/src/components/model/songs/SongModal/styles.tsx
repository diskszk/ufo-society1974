import styled from "styled-components";
import { MIN_WIDTH } from "../../../../constants";

export const StyledSubHeading = styled.h3({
  marginBottom: 20,
});
export const StyledCopyRightArea = styled.div`
  text-align: left;
  padding-left: 12px;
  @media (min-width: ${MIN_WIDTH}) {
    padding-left: 20%;
  }
`;
export const StyledSpace = styled.div({
  height: 16,
});

export const StyledLyricNote = styled.div`
  white-space: pre-wrap;
  text-align: left;

  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
  text-align: left;
  color: black;
  background-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 97%,
    #ddd 97%,
    #ddd 100%
  );
  background-size: 100% 1em;
  line-height: 2;
  background-color: #eee;
  margin: 0 auto;
  margin-bottom: 40px;
  border-radius: 8px;
  width: 88%;
  padding: 8px;

  @media (min-width: ${MIN_WIDTH}) {
    width: 60%;
    padding-left: 64px;
  }
`;
