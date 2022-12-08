import { Toolbar } from "@mui/material";
import { AppBar } from "components/ui/appbar";

export const Header = ({ children }) => {
  return (
    <AppBar>
      <Toolbar>{children}</Toolbar>
    </AppBar>
  );
};
