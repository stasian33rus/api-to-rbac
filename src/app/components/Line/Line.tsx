import React, { FunctionComponent } from "react";
import styled from "styled-components";

export const Line: FunctionComponent = () => {
  return <Hr />;
};

const Hr = styled.hr`
  height: 2px;
  background-color: black;
`;
