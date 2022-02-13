import React, {
  ChangeEvent,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import {
  Operation,
  Permission,
  Role,
} from "../../../../features/render/globalContext";
import styled from "styled-components";
import { Entitie, Editor } from "../../../components/Editor";
import { Modal } from "../../../components/Modal";
import { OperationCard } from "../../../components/OperationCard";

export interface RolesProps {
  roles?: Role[];
  permissions: Permission[];
  onSubmit: (values: {
    name?: string;
    entities?: Entitie<Operation>[];
    oldName?: string;
  }) => void;
}

export const Roles: FunctionComponent<RolesProps> = (props) => {
  const { roles = [], permissions, onSubmit, ...rest } = props;

  const [filteredRoles, setFilteredRoles] = useState(roles);
  const [selectedRole, setSelectedRole] = useState<Role | undefined>();
  useEffect(() => {
    setFilteredRoles(roles);
  }, [roles]);

  const initialRole: Role = {
    name: "",
    permissions: [],
  };

  let mode: "create" | "edit" = "create";
  useEffect(() => {
    if (selectedRole && selectedRole.name !== "") {
      mode = "edit";
    }
  }, [selectedRole]);

  const addedEntities =
    selectedRole &&
    selectedRole.permissions.map((p) => ({
      name: p.name,
      text: p.operations.map((o) => o.name).join("; "),
      data: p.operations,
    }));

  const entities = permissions.map((p) => ({
    name: p.name,
    text: p.operations.map((o) => o.name).join("; "),
    data: p.operations,
  }));

  return (
    <Root {...rest}>
      <Header>
        <Title>Roles</Title>
        <Filter
          placeholder="search"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setFilteredRoles(
              roles.filter((p) => {
                return p.name.includes(event.target.value);
              })
            );
          }}
        />
        <Add
          onClick={() => {
            setSelectedRole(initialRole);
          }}
        >
          +
        </Add>
      </Header>
      <Modal
        visible={selectedRole !== undefined}
        onClose={() => {
          setSelectedRole(undefined);
        }}
      >
        <Editor<Operation>
          mode={mode}
          firstTitle="Role permissions"
          secondTitle="OpenAPI permissions"
          addedEntities={addedEntities}
          entities={entities}
          name={selectedRole && selectedRole.name}
          onClose={() => {
            setSelectedRole(undefined);
          }}
          onSubmit={(values) => {
            onSubmit(values);
            setSelectedRole(undefined);
          }}
        />
      </Modal>
      <PermissionsRoot>
        {filteredRoles.map((p, i) => {
          return (
            <OperationCard
              key={p.name + i}
              text={p.permissions.map((o) => o.name).join("; ")}
              status="normal"
              name={p.name}
              onClick={() => setSelectedRole(p)}
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
