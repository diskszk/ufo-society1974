import styled from "styled-components";
import { MIN_WIDTH } from "../../../../constants";

export const StyledContainer = styled.div`
  width: 70%;
  margin: 0 auto;
  color: #eee;

  @media (min-width: ${MIN_WIDTH}) {
    width: 300px;
  }
`;
export const StyledImage = styled.img`
  width: 66%;
  padding-bottom: 12px;

  @media (min-width: ${MIN_WIDTH}) {
    width: 300px;
  }
`;

export const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 8px;
`;

export const StyledAnchor = styled.a`
  display: flex;
  align-items: center;
`;
