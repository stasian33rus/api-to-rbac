import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { Line } from "../Line";
import { OperationCard } from "../OperationCard";

export interface Entitie<T = []> {
  name: string;
  text: string;
  data?: T[];
  status?: "normal" | "success" | "alert";
}

export interface CreatorProps<T> {
  firstTitle: string;
  secondTitle: string;
  entities: Entitie<T>[];
  addedEntities?: Entitie<T>[];
  name?: string;
  mode: "create" | "edit";
  onClose: () => void;
  onSubmit: (values: {
    name: string;
    entities: Entitie<T>[];
    oldName?: string;
  }) => void;
}

export function Editor<T = []>(props: CreatorProps<T>): ReactElement {
  const {
    entities,
    name = "",
    addedEntities = [],
    firstTitle,
    secondTitle,
    mode,
    onClose,
    onSubmit,
    ...rest
  } = props;

  const [entityName, setEntityName] = useState(name);
  const [addedSection, setAddedSection] = useState(addedEntities);
  const [entitiesSection, setEntitiesSection] = useState(entities);

  return (
    <Root {...rest}>
      <Header>
        <Title
          placeholder="insert name"
          value={entityName}
          onChange={(e) => {
            setEntityName(e.target.value);
          }}
        />
        <Buttons>
          <Save
            disabled={entityName === ""}
            onClick={() => {
              let oldName = undefined;
              if (mode === "edit" && name !== entityName) {
                oldName = name;
              }
              onSubmit({
                name: entityName,
                entities: addedSection,
                oldName,
              });
            }}
          >
            Save
          </Save>
          <Close onClick={onClose}>Close</Close>
        </Buttons>
      </Header>
      <RootSection>
        <Aside>
          <SectionHeader>{firstTitle}</SectionHeader>
          <Line />
          <Entities>
            {addedSection.map((e, i) => {
              return (
                <OperationCard
                  key={e.name + i}
                  name={e.name}
                  status={e.status || "normal"}
                  text={e.text}
                  onRemove={() => {
                    setAddedSection(
                      addedEntities.filter((addedE) => addedE.name !== e.name)
                    );
                  }}
                />
              );
            })}
          </Entities>
        </Aside>
        <Aside>
          <SectionHeader>
            {secondTitle}
            <Filter
              placeholder="filter by operation name"
              onChange={(event) => {
                setEntitiesSection(
                  entities.filter((e) =>
                    e.name
                      .toLowerCase()
                      .includes(event.target.value.toLowerCase())
                  )
                );
              }}
            />
          </SectionHeader>
          <Line />
          <Entities>
            {entities.length == 0 && "add API file"}
            {entitiesSection.map((e, i) => {
              return (
                <OperationCard
                  key={e.name + i}
                  name={e.name}
                  status={e.status || "normal"}
                  text={e.text}
                  onAdd={() => {
                    if (!addedSection.includes(e)) {
                      setAddedSection([...addedSection, e]);
                    }
                  }}
                />
              );
            })}
          </Entities>
        </Aside>
      </RootSection>
    </Root>
  );
}

const Root = styled.div`
  width: 75%;
  height: 75%;
  top: 12.5%;
  left: 12.5%;
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: #fff;
  border: solid 1px black;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  height: 34px;
  padding: 5px 15px;
  justify-content: space-between;
  border: solid 1px black;
  box-sizing: border-box;
`;

const Title = styled.input``;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
`;

const Save = styled.button``;

const Close = styled.button``;

const RootSection = styled.div`
  position: relative;
  display: flex;
  height: calc(100% - 34px); ;
`;

const Aside = styled.div`
  width: 50%;
  height: 100%;
  border: solid 1px black;
  overflow: auto;
  box-sizing: border-box;
`;

const SectionHeader = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 34px;
`;

const Entities = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Filter = styled.input`
  height: 16px;
`;
