import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
    publishedDate: "",
    pages: "",
    category: "",
    bookCover: "",
  });

  useEffect(() => {
    loadBook();
  }, []);

  const [review, setReview] = useState("");

  const loadBook = async () => {
    const result = await axios.get(`http://localhost:8081/book/${id}`);
    setBook(result.data);
  };
  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmitReview = () => {
    // Gửi nhận xét lên máy chủ tại đây
    console.log("Đã gửi nhận xét:", review);
    // Có thể thực hiện các xử lý khác sau khi gửi nhận xét thành công
  };
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value >= 0) {
      setQuantity(value);
    }
  };

  return (
    <div>
      <div
        className="container card shadow border mb-5"
        style={{ backgroundColor: "#white" }}
      >
        <div className="container mt-4">
          <div className="row mb-4">
            <div className="col-md-4">
              <img
                src={book.bookCover}
                alt={book.title}
                className="img-fluid"
              />
            </div>
            <div className="col-md-8">
              <h2>{book.title}</h2>
              <h4 className="text-muted">{book.author}</h4>
              <p>{book.description}</p>
              <p>
                <strong>Sold Quantity: {book.soldQuantity}</strong>
              </p>
              <p>Order:</p>
              <div className="d-flex align-items-center">
                <input
                  type="number"
                  className="form-control mr-2"
                  id="quantity w-auto"
                  style={{ width: '80px' }}
                  
                />
                <button className="btn btn-outline-dark">Add to card</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="form-group">
          <label htmlFor="review">Customer Review</label>

          <textarea
            className="form-control"
            id="review"
            rows="3"
            value={review}
            onChange={handleReviewChange}
          ></textarea>
        </div>
        <button className="btn btn-outline-dark" onClick={handleSubmitReview}>
          Submit Review
        </button>
        <hr />

        <div>
          <h4>Comments:</h4>

          <div>
            <p></p>
            {/* <p className="text-muted">By {comment.author}</p> */}
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
