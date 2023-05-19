import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
 
const ViewBook = () => {
  const [editable, setEditable] = useState(false);
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

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadBook();
  }, []);

  const loadBook = async () => {
    const result = await axios.get(`http://localhost:8081/book/${id}`);
    setBook(result.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleEdit = () => {
    setEditable(true);
  };
  const [error, setError] = useState(null);

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:8081/book/${id}`, book);
      setEditable(false);
      navigate("/bookinfo");
    } catch (error) {
      setError("The book already exists in the database!"); // Đặt giá trị lỗi vào state
    }
  };
  const key = editable ? "edit" : "view";

  return (
    <form id="book-form" key={key}>
      <div
        className="container mt-5 card shadow border bg-white"
        style={{ backgroundColor: "#f2f2f2" }}
      >
        <div className="row">
          <div className="col-md-6">
            <h2>Book Information</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="mb-3">
              <label htmlFor="Title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter book title"
                name="title"
                value={book.title}
                disabled={!editable}
                onChange={handleInputChange}
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
                disabled={!editable}
                onChange={handleInputChange}
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
                disabled={!editable}
                onChange={handleInputChange}
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
                  disabled={!editable}
                  onChange={handleInputChange}
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
                  disabled={!editable}
                  onChange={handleInputChange}
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
                disabled={!editable}
                onChange={handleInputChange}
              >
                <option disabled>Select a category</option>
                <option
                  value="Science Fiction"
                  disabled={!editable}
                  onChange={handleInputChange}
                >
                  Science Fiction
                </option>
                <option
                  value="Horror"
                  disabled={!editable}
                  onChange={handleInputChange}
                >
                  Horror
                </option>
                <option
                  value="Romance"
                  disabled={!editable}
                  onChange={handleInputChange}
                >
                  Romance
                </option>
                <option
                  value="Thriller"
                  disabled={!editable}
                  onChange={handleInputChange}
                >
                  Thriller
                </option>
                <option
                  value="Fantasy"
                  disabled={!editable}
                  onChange={handleInputChange}
                >
                  Fantasy
                </option>
                <option
                  value="Historical Fiction"
                  disabled={!editable}
                  onChange={handleInputChange}
                >
                  Historical Fiction
                </option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <h2>Upload Book Cover</h2>
            <div className="form-group">
              <label htmlFor="book-cover">Choose a file</label>
              <div className="mb-3">
                <input
                  type="file"
                  id="book-bookCover"
                  name="bookCover"
                  value={book.bookCover}
                  disabled={!editable}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12 d-flex justify-content-end">
          {!editable ? (
            <button
              className="btn btn-outline-dark shadow"
              onClick={handleEdit}
            >
              Edit
            </button>
          ) : (
            <button
              className="btn btn-outline-dark shadow"
              onClick={handleSave}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default ViewBook;
