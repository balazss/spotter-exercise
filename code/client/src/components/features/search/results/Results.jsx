import { ItemList } from "components/features/search/itemlist";
import { Spinner } from "components/ui/spinner/Spinner";
import { useSearchState, useSearchUpdater } from "contexts/SearchContext";
import { useRef } from "react";

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

  const scrollRef = useRef(null);

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

      <ItemList products={products} scrollRef={scrollRef} />

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
