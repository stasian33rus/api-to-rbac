import React, {
  ChangeEvent,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { OperationCard } from "../../../../app/components/OperationCard";
import styled from "styled-components";
import {
  Operation,
  Permission,
} from "../../../../features/render/globalContext";
import { Modal } from "../../../../app/components/Modal";
import { Editor, Entitie } from "../../../components/Editor";

export interface PermissionsProps {
  permissions: Permission[];
  operations: Operation[];
  addedOperations: string[];
  removedOperations: string[];
  onSubmit: (values: {
    name?: string;
    entities?: Entitie[];
    oldName?: string;
    data?: unknown;
  }) => void;
}

export const Permissions: FunctionComponent<PermissionsProps> = (props) => {
  const {
    permissions = [],
    operations,
    removedOperations,
    addedOperations,
    onSubmit,
    ...rest
  } = props;

  const [filteredPerm, setFilteredPerm] = useState(permissions);
  const [selectedPermission, setSelectedPermission] = useState<
    Permission | undefined
  >();

  useEffect(() => {
    setFilteredPerm(permissions);
  }, [permissions]);

  let mode: "create" | "edit" = "create";
  useEffect(() => {
    if (selectedPermission && selectedPermission.name !== "") {
      mode = "edit";
    }
  }, [selectedPermission]);

  const initialPermission: Permission = {
    name: "",
    operations: [],
  };

  return (
    <Root {...rest}>
      <Header>
        <Title>Permissions</Title>
        <Filter
          placeholder="search"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setFilteredPerm(
              permissions.filter((p) => p.name.includes(event.target.value))
            );
          }}
        />
        <Add
          onClick={() => {
            setSelectedPermission(initialPermission);
          }}
        >
          +
        </Add>
      </Header>
      <Modal
        visible={selectedPermission !== undefined}
        onClose={() => {
          setSelectedPermission(undefined);
        }}
      >
        <Editor
          mode={mode}
          firstTitle="Permission operations"
          secondTitle="OpenAPI operations"
          addedEntities={
            selectedPermission &&
            selectedPermission.operations.map((o) => {
              let status: "normal" | "alert" | "success" = "normal";
              if (removedOperations.includes(o.name)) {
                status = "alert";
              } else if (addedOperations.includes(o.name)) {
                status = "success";
              }

              return {
                name: o.name,
                text: o.method + " : " + o.path,
                status,
              };
            })
          }
          entities={operations.map((o) => {
            let status: "normal" | "alert" | "success" = "normal";
            if (removedOperations.includes(o.name)) {
              status = "alert";
            } else if (addedOperations.includes(o.name)) {
              status = "success";
            }
            return { name: o.name, text: o.method + " : " + o.path, status };
          })}
          name={selectedPermission && selectedPermission.name}
          onClose={() => {
            setSelectedPermission(undefined);
          }}
          onSubmit={(values) => {
            onSubmit(values);
            setSelectedPermission(undefined);
          }}
        />
      </Modal>
      <PermissionsRoot>
        {filteredPerm.map((p, i) => {
          let status: "normal" | "alert" = "normal";
          p.operations.map((o) => {
            if (removedOperations.includes(o.name)) {
              status = "alert";
            }
          });

          return (
            <OperationCard
              key={p.name + i}
              text={p.operations.map((o) => o.name).join("; ")}
              status={status}
              name={p.name}
              onClick={() => setSelectedPermission(p)}
              onRemove={() => onSubmit({ oldName: p.name })}
            />
          );
        })}
      </PermissionsRoot>
    </Root>
  );
};

const Root = styled.div`
  padding: 16px;
`;

const Header = styled.div`
  display: flex;
  gap: 16px;
`;

const Title = styled.div`
  flex: 1;
  font-size: 28px;
`;

const Filter = styled.input``;

const Add = styled.button``;

const PermissionsRoot = styled.div`
  padding-top: 15px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(225px, 1fr));
  grid-gap: 1em;
`;
