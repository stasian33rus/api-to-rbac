import React, { FunctionComponent, useEffect, useRef } from "react";
import styled from "styled-components";

export interface ModalProps {
  visible: boolean;
  onClose: () => void;
}
export const Modal: FunctionComponent<ModalProps> = (props) => {
  const { children, onClose, visible, ...rest } = props;

  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const outsideClick = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", outsideClick);
    return () => {
      document.removeEventListener("mousedown", outsideClick);
    };
  }, [wrapperRef]);

  return (
    <Background visible={visible} {...rest}>
      {visible && <div ref={wrapperRef}>{children}</div>}
    </Background>
  );
};

interface BackgroundProps {
  visible: boolean;
}

const Background = styled.div<BackgroundProps>`
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  overflow: auto;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
`;
