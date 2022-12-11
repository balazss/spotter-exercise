import styled from "@emotion/styled";
import { Link } from "@mui/material";

export const StyledH1 = styled.h1`
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 12px 0;
  padding: 0;
`;

export const StyledH2 = styled.h2`
  font-size: 16px;
  font-weight: 400;
  line-height: 1.2;
  margin: 0;
  padding: 0;
  color: #777777;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
`;

export const StyledResultsContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(3)};

  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 0 16px;
  }
`;

export const StyledItemListLinkWrapper = styled.div`
  text-align: center;
`;

export const StyledItemListLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.palette.primary.main};
  font-weight: 500;
  font-size: 20px;
`;
