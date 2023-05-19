import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Redirect } from "react-router-dom";

export default function BookInformation() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [confirmAddBook, setConfirmAddBook] = useState(false);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const result = await axios.get("http://localhost:8081/books");
    setBooks(result.data);
  };
  const deleteBooks = async (id) => {
    await axios.delete(`http://localhost:8081/book/${id}`);
    loadBooks();
  };
  const handleDeleteClick = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (confirmDelete) {
      deleteBooks(id); // Thực hiện hành động xóa sách
    }
  };
  const handleAddBookClick = () => {
    const confirmAdd = window.confirm(
      "Are you sure you want to add a new book?"
    );
    if (confirmAdd) {
      setConfirmAddBook(true);
    }
    
  };
  if (confirmAddBook) {
    window.location.href = "/book-detail";
  }

  return (
    <div
      className="container card shadow border mb-5"
      style={{ backgroundColor: "#white" }}
    >
      <div className="container">
        <div className="py-4">
          <h2 className="text-center">Book Information</h2>
          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
              />
            </div>
            <div className="col-md-6 mb-3">
              <button
                className="btn btn-outline-dark btn-white btn-block"
                onClick={handleAddBookClick}
              >
                ADD NEW BOOK
              </button>
            </div>
          </div>
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Category</th>
                <th scope="col">Published Date</th>
                <th scope="col">Pages</th>
                <th scope="col">Sold Quantity</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr>
                  <th scope="row" key={index}>
                    {index + 1}
                  </th>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.category}</td>
                  <td>{book.publishedDate}</td>
                  <td>{book.pages}</td>
                  <td>{book.soldQuantity}</td>
                  <td>
                    <Link
                      className="btn btn-outline-dark mx-2"
                      to={`/book-detail/${book.id}`}
                    >
                      View
                    </Link>
                    <button
                      className="btn btn-outline-danger mx-2 "
                      onClick={() => handleDeleteClick(book.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* <Link
            to="/book-detail"
            className="btn btn-outline-primary shadow btn-white btn-block"
            
          >
            ADD NEW BOOK
          </Link> */}
        </div>
      </div>
    </div>
  );
}
