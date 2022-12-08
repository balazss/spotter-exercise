import { faGift, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  CardContent,
  CardMedia,
  Card as MuiCard,
  Typography,
} from "@mui/material";

export const Card = ({ brand, details, price, discountPrice, imageURL }) => {
  const processedDetails =
    details.length > 65 ? details.slice(0, 65) + "..." : details;

  return (
    <MuiCard
      sx={{
        borderRadius: 6,
        boxShadow:
          "0px 0px 4px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.1);",
      }}
    >
      {/* <CardActionArea> */}
      <CardMedia
        component="img"
        image={imageURL}
        // image={
        //   "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-macbook-air-gold-m1-202010?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1634145607000"
        // }
        alt={`${brand} Computer`}
        sx={{
          objectFit: "contain",
          height: "auto",
          margin: "0 auto",
          maxWidth: "132px",
          maxHeight: "132px",
          padding: "40px 0 24px 0",
        }}
      />
      <CardContent sx={{ paddingTop: 0 }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 700, fontFamily: "system-ui" }}
        >
          {brand}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#363636",
            WebkitLineClamp: 2,
            display: "-webkit-box",
            textOverflow: "ellipsis",
            overflow: "hidden",
            wordBreak: "break-all",
          }}
        >
          {processedDetails}
        </Typography>
        <div style={{ display: "flex", marginTop: "12px" }}>
          {discountPrice && (
            <Typography
              variant="body1"
              sx={{ color: "#FF6669", fontWeight: 500 }}
            >
              ${discountPrice}
            </Typography>
          )}
          <Typography
            variant="body1"
            sx={{
              color: "#9C9C9C",
              fontSize: 14,
              textDecoration: `${discountPrice ? "line-through" : "none"}`,
              fontWeight: 500,
              lineHeight: 1.76,
              marginLeft: "4px",
            }}
          >
            ${price}
          </Typography>
        </div>
        <div
          style={{
            borderTop: "1px solid #eee",
            display: "flex",
            marginTop: "8px",
            paddingTop: "8px",
          }}
        >
          <div style={{ marginRight: "16px", display: "flex" }}>
            <FontAwesomeIcon
              icon={faTruck}
              color="#9C9C9C"
              style={{ marginRight: "5px" }}
              size="xs"
            />
            <Typography
              variant="body2"
              sx={{ color: "#9C9C9C", fontSize: "10px", fontWeight: 500 }}
            >
              Free Shipping
            </Typography>
          </div>
          <div style={{ marginRight: "16px", display: "flex" }}>
            <FontAwesomeIcon
              icon={faGift}
              color="#9C9C9C"
              style={{ marginRight: "5px" }}
              size="xs"
            />
            <Typography
              variant="body2"
              sx={{ color: "#9C9C9C", fontSize: "10px", fontWeight: 500 }}
            >
              Free Gift
            </Typography>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "36px 0 0 0",
          }}
        >
          <Button
            variant="contained"
            fullWidth
            sx={{
              borderRadius: "24px",
              boxShadow: "none",
              fontSize: "16px",
              fontWeight: 500,
            }}
          >
            View Deal
          </Button>
        </div>
      </CardContent>
      {/* </CardActionArea> */}
    </MuiCard>
  );
};
