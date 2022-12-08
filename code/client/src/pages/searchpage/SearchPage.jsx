import { Toolbar } from "@mui/material";
import { Container, Header } from "components/ui";
import { Page } from "components/ui/page";
import { SearchInput } from "components/ui/searchinput";
import { Results } from "features/results";
import { SearchProvider } from "utils/SearchContext";

export const SearchPage = () => {
  return (
    <Page>
      <SearchProvider>
        <Header>
          <Container>
            <SearchInput />
          </Container>
        </Header>
        <Toolbar /> {/* This is for spacing betwween the header and content */}
        <Container>
          <Results />
        </Container>
      </SearchProvider>
    </Page>
  );
};
