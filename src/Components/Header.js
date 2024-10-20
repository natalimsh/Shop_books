import React, { Component } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import logo from "./01.png";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import './Header.css';

import Home from "../Pages/Home";
import Catalog from "../Pages/Catalog";
import Events from "../Pages/Events";
import Cart from "../Pages/Cart";
import booksData from '../book/books.json';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      genres: [],
      dropdownOpen: false,
    };
  }

  componentDidMount() {
    this.extractGenres();
  }

  extractGenres() {
    const uniqueGenres = Array.from(new Set(booksData.map(book => book.genre)));
    this.setState({ genres: uniqueGenres });
  }

  handleSearchInput = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  toggleDropdown = (isOpen) => {
    this.setState({ dropdownOpen: isOpen });
  };

  handleClickOutside = () => {
    this.toggleDropdown(false);
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

                  <Dropdown
                    onMouseEnter={() => this.toggleDropdown(true)}
                    onMouseLeave={() => this.toggleDropdown(false)}
                    show={this.state.dropdownOpen}
                    className="nav-item"
                  >
                    <Dropdown.Toggle
                      as={Nav.Link}
                      className="nav-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      Catalog
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to="/catalog" onClick={() => this.toggleDropdown(false)}>
                        All Books
                      </Dropdown.Item>
                      {this.state.genres.map((genre) => (
                        <Dropdown.Item key={genre} as={Link} to={`/catalog?genre=${genre}`} onClick={() => this.toggleDropdown(false)}>
                          {genre}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>

                  <Nav.Link as={Link} to="/cart">
                    <FaShoppingCart className="me-1" />
                  </Nav.Link>
                </Nav>
                <Form className="d-flex ms-2">
                  <FormControl
                    type="text"
                    placeholder="Search for books..."
                    className="me-2"
                    aria-label="Search"
                    value={this.state.searchQuery}
                    onChange={this.handleSearchInput}
                  />
                  {/* Removed the search button */}
                </Form>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Routes>
            <Route path="/" element={<Home />} />
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
