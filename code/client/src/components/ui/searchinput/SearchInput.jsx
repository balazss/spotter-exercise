import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchUpdater } from "contexts/SearchContext";
import { useForm } from "hooks/useForm";

import {
  SearchIconWrapper,
  StyledInputBase,
  StyledSearch,
} from "./SearchInput.styles";

export const SearchInput = () => {
  const { loadProducts } = useSearchUpdater();

  function submit() {
    loadProducts(values.search);
  }

  const { handleChange, values } = useForm(submit, {
    search: "",
  });

  return (
    <StyledSearch>
      <SearchIconWrapper>
        <FontAwesomeIcon icon={faSearch} color="#aeaeae" size="lg" />
      </SearchIconWrapper>
      <StyledInputBase
        autoFocus
        inputProps={{ "aria-label": "search" }}
        name="search"
        placeholder="Search"
        onChange={handleChange}
        value={values.search}
      />
    </StyledSearch>
  );
};
