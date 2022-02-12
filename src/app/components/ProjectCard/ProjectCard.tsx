import React from "react";
import styled from "styled-components";

interface ProjectCardProps {
  title: string;
  text: string;
  onClick: () => void;
}

export function ProjectCard(props: ProjectCardProps): React.ReactElement {
  const { text, title, ...rest } = props;
  const cardTitle: string = title;
  if (title.length > 24) {
    // cardTitle = title.substring(0, 18) + "...";
  }
  return (
    <Card {...rest}>
      <Title>{cardTitle}</Title>
      <Text>{text}</Text>
    </Card>
  );
}

const Card = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100px;
  border: solid 1px black;
  border-radius: 4px;
  box-shadow: 0px 0px 8px 0px black;

  :hover {
    box-shadow: 0px 0px 8px 2px black;
  }
`;

const Title = styled.span`
  padding-left: 10px;
  font-size: 18px;
  font-weight: bold;
`;

const Text = styled.span`
  display: flex;
  text-align: left;
  padding-left: 10px;
  padding-bottom: 5px;
  font-size: 18px;
  overflow-wrap: anywhere;
  font-size: 14px;
`;
