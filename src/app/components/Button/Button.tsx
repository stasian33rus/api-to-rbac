import React, { FunctionComponent } from "react";
import styled from "styled-components";

export interface ButtonProps {
  text?: string;
  outlined?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export const Button: FunctionComponent<ButtonProps> = (props) => {
  const { text, outlined = false, disabled = false, children, ...rest } = props;
  return (
    <StyledButton outlined={outlined} disabled={disabled} {...rest}>
      {text || children}
    </StyledButton>
  );
};

interface StyledButtonProps {
  outlined: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  background: ${(props) => (props.outlined ? "none" : undefined)};
  border: ${(props) => (props.outlined ? "none" : undefined)};
  padding: ${(props) => (props.outlined ? 0 : undefined)};
  color: ${(props) => (props.outlined ? "#069" : undefined)};
  /* text-decoration: ${(props) =>
    props.outlined ? "underline" : undefined}; */
  cursor: ${(props) => (props.outlined ? "pointer" : undefined)};
`;
