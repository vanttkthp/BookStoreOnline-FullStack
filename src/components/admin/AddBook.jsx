import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ImagePreview from "./ImagePreview";
import Footer from "./Footer";

export default function AddBook(props) {
  let navigate = useNavigate();
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
    publishedDate: "",
    pages: "",
    category: "",
    bookCover: "",
  });

  const {
    title,
    author,
    description,
    publishedDate,
    pages,
    category,
    bookCover,
  } = book;
  const onInputChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8081/book", book);
      setIsDuplicate(false); // Reset trạng thái thông báo nếu gửi thành công
      navigate("/bookinfo");
    } catch (error) {
      setIsDuplicate(true); // Đánh dấu thông báo là dữ liệu đã tồn tại
      console.error(error);
    }
  };

  const [previewUrl, setPreviewUrl] = useState(null);

  const previewImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={(e) => onSubmit(e)} id="book-form">
      <div
        className="container mt-5 card shadow border bg-white"
        style={{ backgroundColor: "#f2f2f2" }}
      >
        <div className="row">
          <div className="col-md-6">
            <h2>Book Information</h2>
            {isDuplicate && (
              <p className="text-danger">
                The book already exists in the database!
              </p>
            )}

            <div className="mb-3">
              <label htmlFor="Title" className="form-label">
                Title
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter book title"
                name="title"
                value={book.title}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="book-author">Author</label>
              <input
                type="text"
                className="form-control"
                id="book-author"
                placeholder="Enter book author"
                name="author"
                value={book.author}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="book-description">Description</label>
              <textarea
                className="form-control"
                id="book-description"
                rows="3"
                value={book.description}
                name="description"
                onChange={(e) => onInputChange(e)}
              ></textarea>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="book-release-date">Published Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="book-release-date"
                  name="publishedDate"
                  value={book.publishedDate}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="book-pages">Pages</label>
                <input
                  type="number"
                  className="form-control"
                  id="book-pages"
                  name="pages"
                  value={book.pages}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="book-category">Category</label>
              <select
                className="form-control"
                id="book-category"
                name="category"
                value={book.category} // Đảm bảo rằng biến state `category` đã được khai báo và gán giá trị
                onChange={(e) => setBook({ ...book, category: e.target.value })}
              >
                <option disabled>Select a category</option>
                <option value="Science Fiction">Science Fiction</option>
                <option value="Horror">Horror</option>
                <option value="Romance">Romance</option>
                <option value="Thriller">Thriller</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Historical Fiction">Historical Fiction</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <h2>Upload Book Cover</h2>
            <div>
              <div className="form-group">
                <input
                  type="file"
                  onChange={(e) => {
                    onInputChange(e);
                    previewImage(e);
                  }}
                  className="mb-3"
                />
              </div>
              <div className="form-group">
                <img id="preview" src={previewUrl} alt="Preview" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12 d-flex justify-content-end">
          {/* Footer */}
          <button
            type="submit"
            className="btn btn-outline-dark shadow"
            form="book-form"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
}
