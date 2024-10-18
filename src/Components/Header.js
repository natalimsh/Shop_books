import React, { Component } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import logo from "./01.png";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FaShoppingCart, FaSearch } from "react-icons/fa"; // Імпорт іконок
import './Header.css';

import Home from "../Pages/Home";
import Catalog from "../Pages/Catalog";
import Events from "../Pages/Events";
import Cart from "../Pages/Cart";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "", // стан для пошукового запиту
    };
  }

  // Обробник події для зміни пошукового запиту
  handleSearchInput = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  // Обробник події для надсилання форми
  handleSearchSubmit = (event) => {
    event.preventDefault();
    // Додаткова логіка не потрібна
  };

  render() {
    return (
      <Router>
        <div>
          <Navbar
            collapseOnSelect
            expand="sm"
            bg="dark"
            variant="dark"
            className="header"
          >
            <Container>
              <Navbar.Brand as={Link} to="/">
                <img
                  src={logo}
                  height="40"
                  width="40"
                  className="d-inline-block align-top"
                  alt="Logo"
                />{" "}
                КнигоТека
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ms-auto">
                  <Nav.Link as={Link} to="/">
                    Home
                  </Nav.Link>

                  <Nav.Link as={Link} to="/events">
                  Events
                  </Nav.Link>
                  <Nav.Link as={Link} to="/catalog">
                    Catalog
                  </Nav.Link>
                  <Nav.Link as={Link} to="/cart">
                    <FaShoppingCart className="me-1" />
                  </Nav.Link>
                </Nav>
                {/* Форма пошуку з обробкою події onSubmit */}
                <Form className="d-flex ms-2" onSubmit={this.handleSearchSubmit}>
                  <FormControl
                    type="text"
                    placeholder="Search for books..."
                    className="me-2"
                    aria-label="Search"
                    value={this.state.searchQuery} // значення пошукового запиту
                    onChange={this.handleSearchInput} // обробка введення
                  />
                  <Button variant="outline-info" type="submit">
                    <FaSearch className="me-1" /> Search
                  </Button>
                </Form>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Передаємо пошуковий запит через пропси в компонент Catalog */}
            <Route
              path="/catalog"
              element={<Catalog searchQuery={this.state.searchQuery} />}
            />
            <Route path="/events" element={<Events />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </Router>
    );
  }
}
