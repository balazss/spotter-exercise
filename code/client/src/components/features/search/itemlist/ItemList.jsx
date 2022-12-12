import { Card } from "components/ui";
import { useEffect, useRef } from "react";

import {
  StyledGridItem,
  StyledGridRow,
  StyledItemListWrapper,
} from "./ItemList.styles";

export const ItemList = ({ products, scrollRef }) => {
  const previousLength = useRef(products.length);

  useEffect(() => {
    if (
      products.length &&
      previousLength.current !== 0 &&
      previousLength.current !== products.length
    ) {
      // We can't use scrollIntoView because of the fixed header, so we need to get the bounding client rect of the
      // scrollRef and scroll to that position.
      const rect = scrollRef?.current?.getBoundingClientRect();
      window.scrollTo({
        top: rect?.top + window.pageYOffset - 120, // Sticky header height plus some margin
        behavior: "smooth",
      });
    }

    previousLength.current = products.length;
  }, [products.length, scrollRef]);

  try {
    return (
      <StyledItemListWrapper>
        <StyledGridRow>
          {products.map((product, index) => (
            <StyledGridItem
              key={product.id}
              ref={index === previousLength.current ? scrollRef : null}
            >
              <Card
                id={product.id}
                brand={product.vendor}
                details={product.title}
                price={product.price}
                discountPrice={product.strikedPrice}
                imageURL={product.image}
              />
            </StyledGridItem>
          ))}
        </StyledGridRow>
      </StyledItemListWrapper>
    );
  } catch (error) {
    console.log(error);
  }
};
