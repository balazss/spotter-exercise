import { Toolbar } from "@mui/material";
import { Results } from "components/features/search/results";
import { Container, Header } from "components/ui";
import { Page } from "components/ui/page";
import { SearchInput } from "components/ui/searchinput";
import { SearchProvider } from "contexts/SearchContext";

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
