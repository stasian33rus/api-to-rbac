import { Button } from "../../components/Button";
import styled from "styled-components";

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
`;

export const Error = styled.div`
  text-align: center;
  color: red;
  font-size: 18px;
`;

export const Title = styled.input`
  flex: 1;
  font-size: 18px;
  border: none;
  outline: none;
`;

export const HiddenInputFile = styled.input`
  display: none;
`;

export const StyledButton = styled(Button)`
  font-size: 26px;
  padding: 1rem;
`;
