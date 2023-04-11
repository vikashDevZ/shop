import React from "react";
import { Card, Button } from "react-bootstrap";

const Product = ({ product, addTobasket }) => {
  return (
    <Card key={product.id} style={{ width: "18rem", margin: "10px" }}>
      <div style={{ position: "relative", height: "220px", margin: "1rem" }}>
        <Card.Img
          variant="top"
          src={product.imageUrl}
          style={{ height: "100%", width: "100%", objectFit: "contain" }}
        />
      </div>
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Card.Title>
            {product?.name.length > 20
              ? product?.name.substring(0, 20) + "..."
              : product?.name}
          </Card.Title>
          <div style={{ height: "120px", overflow: "auto" }}>
            <Card.Text>
              Price: ${product.price}
              <br />
              Rating: {product.rating}/5
              <br />
              Description:{" "}
              {product?.description.length > 20
                ? product?.description.substring(0, 20) + "..."
                : product?.description}
              <br />
              Available:{" "}
              <span
                style={{ color: product.isActive == true ? "green" : "red" }}
              >
                {product.isActive == true ? "yes" : "no"}
              </span>
            </Card.Text>
          </div>
        </div>
        <Button variant="primary" onClick={() => addTobasket(product)}>
          Add to basket
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
