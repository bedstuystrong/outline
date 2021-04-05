// @flow
import styled from "styled-components";

const TeamLogo = styled.img`
  width: ${(props) =>
    props.width ? `${props.width}px` : props.size || "auto"};
  height: ${(props) =>
    props.height ? `${props.height}px` : props.size || "100px"};
  border-radius: 4px;
  background: ${(props) => props.theme.background};
  overflow: hidden;
  flex-shrink: 0;
`;

export default TeamLogo;
