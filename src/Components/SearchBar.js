import React, { useState, useEffect } from "react";
import booksData from "../book/books.json"; // Adjust the import path as needed

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    // Function to filter books based on search term
    const filterBooks = () => {
      if (!searchTerm) {
        setFilteredBooks([]); // If no search term, clear results
        return;
      }

      const filtered = booksData.filter((book) => {
        return (
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });

      setFilteredBooks(filtered);
    };

    filterBooks();
  }, [searchTerm]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a book or author..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
      />
      {filteredBooks.length > 0 && ( // Only show results if there are any
        <ul>
          {filteredBooks.map((book, index) => (
            <li key={index}>
              {book.title} by {book.author}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
