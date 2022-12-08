import { Spinner } from "components/ui/spinner/Spinner";
import { ItemList } from "features/itemlist";
import { useSearchState, useSearchUpdater } from "utils/SearchContext";

import {
  StyledH1,
  StyledH2,
  StyledItemListLink,
  StyledItemListLinkWrapper,
  StyledResultsContainer,
} from "./Results.styles";

export const Results = () => {
  const { products, count, hasMore, query, loading } = useSearchState();
  const { loadProducts } = useSearchUpdater();

  const handleClick = (e) => {
    e.preventDefault();
    loadProducts(query, products.length);
  };

  return (
    <>
      <StyledResultsContainer>
        <StyledH1>Results</StyledH1>
        <StyledH2>
          Showing {products.length} of {count}
        </StyledH2>
      </StyledResultsContainer>
      <ItemList products={products} />
      <StyledItemListLinkWrapper>
        {hasMore && !loading && products.length > 0 ? (
          <StyledItemListLink
            onClick={handleClick}
            underline="none"
            sx={{
              textAlign: "center",
              fontWeight: 500,
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            {" "}
            Show More
          </StyledItemListLink>
        ) : (
          <>{loading ? <Spinner /> : <StyledH2>No Results Found</StyledH2>}</>
        )}
      </StyledItemListLinkWrapper>
    </>
  );
};
