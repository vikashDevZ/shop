import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import Basket from "../Basket";

const Header = ({ basket, removeFrombasket }) => {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand style={{ cursor: "pointer" }}>{"Shop"}</Navbar.Brand>
          <Nav>
            <Nav.Link className="text-white">
              <Basket basket={basket} removeFrombasket={removeFrombasket} />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
};

export default Header;
