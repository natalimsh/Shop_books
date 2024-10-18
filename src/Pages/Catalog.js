import React, { useState } from "react";
import { useDispatch } from "react-redux";
import booksData from "../book/books.json";
import { addToCart } from "../redux/actions";
import Modal from "../Components/modal/Modal"; // Correct import
import "./Catalog.css";

const Catalog = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const genres = ["all", ...new Set(booksData.map((book) => book.genre))];

  const handleAddToCart = (book) => {
    dispatch(addToCart(book));
    alert(`${book.title} було додано до кошика!`);
  };

  // Фільтрація книг за жанром і пошуковим запитом
  const filteredBooks = booksData
    .filter((book) =>
      selectedGenre === "all" ? true : book.genre === selectedGenre
    )
    .filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
        {/* Список жанрів */}
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

        {/* Каталог книг */}
        <div className="catalog-grid">
          {filteredBooks.map((book) => (
            <div key={book.id} className="catalog-tile">
              <img
                src={book.image}
                alt={book.title}
                className="book-image"
                onError={(e) => (e.target.src = "/img/default-image.jpg")}
                onClick={() => openModal(book)} // Відкриття модального вікна при кліку на зображення
              />
              <h3 className="book-title" onClick={() => openModal(book)}>
                {book.title}
              </h3>
              <h4 className="book-author">{book.author}</h4>
              <h5 className="book-price">${book.price.toFixed(2)}</h5>
              <button
                className="buy-button"
                onClick={() => handleAddToCart(book)}
              >
                Buy
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Component */}
      {selectedBook && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          image={selectedBook.image}
          title={selectedBook.title}
          description={selectedBook.description}
          onAddToCart={() => handleAddToCart(selectedBook)} // Додаємо книгу в кошик через модальне вікно
          book={selectedBook}
        />
      )}
    </div>
  );
};

export default Catalog;
