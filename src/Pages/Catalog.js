import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import booksData from "../book/books.json";
import { addToCart } from "../redux/actions";
import Modal from "../Components/modal/Modal";
import "./Catalog.css";

const Catalog = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [selectedGenre, setSelectedGenre] = useState("всі книги");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000); // Set initial max value to a reasonable limit

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const genreFromUrl = params.get("genre");
    setSelectedGenre(genreFromUrl || "всі книги");
  }, [location.search]);

  const genres = ["всі книги", ...new Set(booksData.map((book) => book.genre))];

  const handleAddToCart = (book) => {
    dispatch(addToCart(book));
    alert(`${book.title} було додано до кошика!`);
  };

  // Filter books based on genre, search query, and price range
  const filteredBooks = booksData
    .filter((book) =>
      selectedGenre === "всі книги" ? true : book.genre === selectedGenre
    )
    .filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((book) => book.price >= minPrice && book.price <= maxPrice);

  const openModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  return (
    <div className="catalog-container">
      <h2>Всі книги</h2>

      <div className="catalog-layout">
        {/* Genre and Price Filter Section */}
        <div className="genre-price-container">
          <div className="genre-list">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`genre-button ${selectedGenre === genre ? "active" : ""}`}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* Price Range Slider below Genre Selection */}
          <div className="price-filter">
            <h4>Фільтрувати за ціною</h4>
            <label>
              Мінімальна ціна: ₴{minPrice}
              <input
                type="range"
                min="0"
                max="1000"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
              />
            </label>
            <label>
              Максімальна ціна: ₴{maxPrice}
              <input
                type="range"
                min="0"
                max="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </label>
          </div>
        </div>

        {/* Books Grid */}
        <div className="catalog-grid">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div key={book.id} className="catalog-tile">
                <img
                  src={book.image}
                  alt={book.title}
                  className="book-image"
                  onError={(e) => (e.target.src = "/img/default-image.jpg")}
                  onClick={() => openModal(book)}
                />
                <h3 className="book-title" onClick={() => openModal(book)}>
                  {book.title}
                </h3>
                <h4 className="book-author">{book.author}</h4>
                <h5 className="book-price">₴{book.price.toFixed(2)}</h5>
                <button
                  className="buy-button"
                  onClick={() => handleAddToCart(book)}
                >
                  Придбати
                </button>
              </div>
            ))
          ) : (
            <p>Нічого за Вашим запитом не знайдено...</p>
          )}
        </div>
      </div>

      {selectedBook && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          image={selectedBook.image}
          title={selectedBook.title}
          description={selectedBook.description}
          onAddToCart={() => handleAddToCart(selectedBook)}
          book={selectedBook}
        />
      )}
    </div>
  );
};

// Prop validation
Catalog.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default Catalog;
