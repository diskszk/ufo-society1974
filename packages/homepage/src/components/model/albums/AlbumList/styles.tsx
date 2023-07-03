import styled from "styled-components";
import { MIN_WIDTH } from "../../../../constants";

export const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  width: 75%;
  margin: 0 auto;

  @media (min-width: ${MIN_WIDTH}) {
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
  }
`;
