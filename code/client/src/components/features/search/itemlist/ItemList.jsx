import { Card } from "components/ui";

import {
  StyledGridItem,
  StyledGridRow,
  StyledItemListWrapper,
} from "./ItemList.styles";

export const ItemList = ({ products }) => {
  try {
    return (
      <StyledItemListWrapper>
        <StyledGridRow>
          {products.map((product) => (
            <StyledGridItem key={product.id}>
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
