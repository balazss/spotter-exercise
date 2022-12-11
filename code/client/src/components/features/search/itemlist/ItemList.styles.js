import styled from "@emotion/styled";

export const StyledGridRow = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  gap: 24px;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    justify-content: center;
  }
}`;

export const StyledGridItem = styled.div`
  flex-basis: calc((100% / 4) - 18px);
  position: relative;
  padding 10px;
  width: 322px;  

  // ${({ theme }) => theme.breakpoints.up("md")} {
  //   flex-basis: calc((100% / 3) - 18px);
  

  ${({ theme }) => theme.breakpoints.down("lg")} {
    flex-basis: calc((100% / 3) - 18px);
  

  ${({ theme }) => theme.breakpoints.down("md")} {
    flex-basis: calc((100% / 2) - 18px);
  
    ${({ theme }) => theme.breakpoints.down("sm")} {
      flex-basis: calc((100% / 1) - 18px);
    `;

export const StyledItemListWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;
