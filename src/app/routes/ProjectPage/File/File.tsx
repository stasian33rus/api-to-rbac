import React, { FunctionComponent, useState } from "react";
import { Button } from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import styled from "styled-components";
import { Operation } from "../../../../features/render/globalContext";
import { OperationCard } from "../../../../app/components/OperationCard";

export interface FileProps {
  operations: Operation[];
  name: string;
  path: string;
  addedOperationsText?: string;
  removedOperationsText?: string;
  onChangeFile: () => void;
}

export const File: FunctionComponent<FileProps> = (props) => {
  const {
    name,
    path,
    operations,
    addedOperationsText,
    removedOperationsText,
    onChangeFile,
  } = props;

  const [operationsVisible, setOperationsVisible] = useState(false);

  return (
    <Root>
      <Name>{name}</Name>
      <FileInfo>
        <FilePath>
          {path}
          <Button outlined onClick={onChangeFile}>
            Change
          </Button>
        </FilePath>
        <FileOperations>
          <Modal
            visible={operationsVisible}
            onClose={() => setOperationsVisible(false)}
          >
            <ModalOperations>
              {operations.map((o, i) => {
                return (
                  <OperationCard
                    key={o.name + i}
                    name={o.name}
                    text={o.method.toUpperCase() + " " + path}
                    status="normal"
                  />
                );
              })}
            </ModalOperations>
          </Modal>
          {`${operations.length} operations.`}
          <Button onClick={() => setOperationsVisible(true)} outlined>
            Show all
          </Button>
        </FileOperations>
      </FileInfo>
      <OperationsInfo>
        {addedOperationsText && (
          <Added>{`Operation ${addedOperationsText} added.`}</Added>
        )}
        {removedOperationsText && (
          <Removed>{`Operation ${removedOperationsText} removed.`}</Removed>
        )}
      </OperationsInfo>
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  gap: 15px;
  padding: 16px;
`;

const Name = styled.span`
  font-family: sans-serif;
  font-size: 26px;
  font-weight: 600;
`;

const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const FilePath = styled.div`
  display: flex;
  gap: 15px;
`;

const FileOperations = styled.div`
  display: flex;
  gap: 15px;
`;

const OperationsInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const ModalOperations = styled.div`
  position: absolute;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 15px;
  width: 50%;
  height: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border: solid 8px black;
  border-radius: 15px;
`;

const Added = styled.span`
  color: green;
`;

const Removed = styled.span`
  color: red;
`;
