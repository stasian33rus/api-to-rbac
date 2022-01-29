import React, { FunctionComponent } from "react";
import styled from "styled-components";

export interface FileViewerProps {
  title: string;
  text?: string;
}

export const FileViewer: FunctionComponent<FileViewerProps> = (props) => {
  const { title, text, ...rest } = props;
  return (
    <Root {...rest}>
      <Header>
        <Title>{title}</Title>
        <CopyButton
          onClick={() => {
            navigator.clipboard.writeText(text || "");
          }}
        >
          Copy
        </CopyButton>
      </Header>
      <FileBackground>{text}</FileBackground>
    </Root>
  );
};

const Root = styled.div`
  padding: 16px;
`;

const Header = styled.div`
  margin-bottom: 16px;
  height: 32px;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 28px;
`;

const CopyButton = styled.button``;

const FileBackground = styled.div`
  background-color: #1b2c47;
  padding: 18px;
  overflow: auto;
  color: #fff;
  white-space: pre-wrap;

  height: 500px;
  overflow: auto;
`;
