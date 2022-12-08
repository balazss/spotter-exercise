import styled from "@emotion/styled";
import React from "react";

export const Spinner = () => {
  const StyledDiv3 = styled.span`
    width: 20px;
    height: 20px;
    border: 2px solid #fff;
    border-bottom-color: ${({ theme }) => theme.palette.primary.main};
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 0.7s linear infinite;

    @keyframes rotation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;

  return (
    <StyledDiv3>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </StyledDiv3>
  );
};
