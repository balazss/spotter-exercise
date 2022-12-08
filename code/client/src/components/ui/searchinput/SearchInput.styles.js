import styled from "@emotion/styled";
import { InputBase } from "@mui/material";

export const StyledSearch = styled.div`
  position: relative;
  border-radius: 24px;
  background-color: #f7f7f7;
  margin-left: 0;
  width: 100%;
`;

export const SearchIconWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing(0, 2)};
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledInputBase = styled(InputBase)`
  width: 100%;
  & .MuiInputBase-input {
    padding: ${({ theme }) => theme.spacing(1, 1, 1, 0)};
    padding-left: calc(1em + ${({ theme }) => theme.spacing(4)});
    width: 100%;
    font-weight: 600;
    font-size: 16px;
    color: #aeaeae;
  }
`;
