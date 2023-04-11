import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Container, ListGroup } from "react-bootstrap";

const Basket = ({ basket, removeFrombasket }) => {
  const [show, setShow] = useState(false);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    let sum = 0;
    let productCount = 0;
    basket.forEach((item) => {
      productCount += item.count;
      if (item.count > 1) {
        sum += item.price * item.count;
      } else {
        sum += item.price;
      }
    });
    setTotal(sum);
    setCount(productCount);
  }, [basket]);

  return (
    <Container
      onKeyDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      onFocus={(e) => e.stopPropagation()}
      onMouseOver={(e) => e.stopPropagation()}
    >
      <Button variant="primary" onClick={handleShow}>
        Basket {count} items
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Products ${total}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {basket.map((product) => (
              <ListGroup.Item
                key={product._id}
                className="d-flex justify-content-between"
              >
                <div>
                  {product.name} - ${product.price} x {product.count}
                </div>
                <Button
                  variant="danger"
                  onClick={() => removeFrombasket(product._id)}
                >
                  Remove
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Basket;
