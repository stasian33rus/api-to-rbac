import React, { FunctionComponent } from "react";
import styled from "styled-components";

export interface OperationCardProps {
  name: string;
  text: string;
  status: "normal" | "alert" | "success";
  onRemove?: () => void;
  onAdd?: () => void;
  onClick?: () => void;
}

export const OperationCard: FunctionComponent<OperationCardProps> = (props) => {
  const { name, text, status, onRemove, onAdd, onClick, ...rest } = props;

  return (
    <Root
      status={status}
      hoverEffect={onClick !== undefined}
      onClick={onClick}
      {...rest}
    >
      <Data>
        <Name>{name}</Name>
        {text}
      </Data>
      {onRemove && (
        <Remove
          onClick={(event) => {
            onRemove();
            event.stopPropagation();
          }}
        >
          Delete
        </Remove>
      )}
      {onAdd && (
        <Add
          onClick={(event) => {
            onAdd();
            event.stopPropagation();
          }}
        >
          Add
        </Add>
      )}
    </Root>
  );
};

interface RootProps {
  status: "normal" | "alert" | "success";
  hoverEffect: boolean;
}

const Root = styled.div<RootProps>`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  border-radius: 12px;
  box-shadow: 0px 0px 8px 0px
    ${(props) =>
      props.status === "normal"
        ? undefined
        : props.status === "success"
        ? "green"
        : "red"};

  :hover {
    cursor: pointer;
    box-shadow: ${(props) => {
      if (props.hoverEffect) {
        return (
          "0px 0px 12px 8px" +
          (props.status === "normal"
            ? "normal"
            : props.status === "success"
            ? "green"
            : "red")
        );
      }
      return undefined;
    }};
  }
`;

const Name = styled.div`
  display: flex;
  flex-direction: column;
`;

const Data = styled.div``;

const Remove = styled.button``;
const Add = styled.button``;
