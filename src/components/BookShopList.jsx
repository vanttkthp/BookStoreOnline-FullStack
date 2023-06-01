import React, { useState, useEffect } from "react";

import axios from "axios";
import { Link } from 'react-router-dom';
import "./fitsize.css";

const BookShopList = () => {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/books")
      .then((res) => {
        setBooks(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const bookList = books.map((book) => (
    <div className="col-md-3 mb-3 card-deck hover-zoom" key={book.id}>
      <Link to={`/book/${book.id}`} className="card d-flex flex-column align-items-center bg-white custom-link border-0 text-decoration-none text-dark">
        <img
          src={book.bookCover}
          alt={book.title}
          className="rounded border mt-2"
        />
        <div className="card-body text-center">
          <h5 className="card-title">{book.title}</h5>
          <p className="card-text position-absolute bottom-0 start-50 translate-middle-x">
            {book.author}
          </p>
        </div>
      </Link>
    </div>
  ));

  return (
    <div className="card bg-white shadow border mb-4" style={{ backgroundColor: "#f2f2f2" }}>
      <h1 className="my-5 text-center">Book Shop Online</h1>
      <hr/>
      <div className="row justify-content-center">{bookList}</div>
    </div>
  );
};

export default BookShopList;
