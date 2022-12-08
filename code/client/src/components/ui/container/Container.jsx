import { Container as MuiContainer } from "@mui/material";

export const Container = ({ children }) => {
  return (
    <MuiContainer fixed disableGutters>
      {children}
    </MuiContainer>
  );
};
