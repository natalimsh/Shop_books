import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa"; // Імпорт іконок соцмереж
import "./Footer.css"; // Імпорт стилів футера

const Footer = () => {
  return (
    <Container fluid className="footer">
      <Row className="py-4">
        <Col md={4} className="text-center">
          <p className="text-muted">© 2024 КнигоТека, Inc</p>
          <p className="slogan">"Відкрийте світ книг!"</p> {/* Додано слоган */}
        </Col>
        <Col md={4} className="text-center">
          <h5>Контакти</h5>
          <p>Телефон: +38 (044) 123-45-67</p>
          <p>Email: info@knigoteka.com</p>
          <p>Графік роботи: Пн-Нд</p>
          <p>9:00 - 21:00</p>
        </Col>
        <Col md={4} className="text-center">
          <h5>Соціальні мережі</h5>
          <ul className="nav justify-content-center list-unstyled d-flex">
            <li className="ms-3">
              <a href="https://twitter.com" className="social-icon">
                <FaTwitter size={35} /> {/* Іконка Twitter */}
              </a>
            </li>
            <li className="ms-3">
              <a href="https://instagram.com" className="social-icon">
                <FaInstagram size={35} /> {/* Іконка Instagram */}
              </a>
            </li>
            <li className="ms-3">
              <a href="https://facebook.com" className="social-icon">
                <FaFacebook size={35} /> {/* Іконка Facebook */}
              </a>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
