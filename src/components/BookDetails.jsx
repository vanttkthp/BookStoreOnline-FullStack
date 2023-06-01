import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const BookDetails = () => {
  const username = localStorage.getItem("userName");
  const { id } = useParams();
  const [reviewError, setReviewError] = useState("");
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
    loadReviews();
  }, []);
  const [order, setOrder] = useState({
    bookTitle: "",
    bookAuthor: "",
    bookCategory: "",
    bookPages: "",
    bookId: "",
    userName: "",
    quantity: "",
    orderStatus: "",
    orderQuantity: "",
  });

  const [orderSuccess, setOrderSuccess] = useState(false);
  function submitOrder() {
    const orderData = {
      ...order,
      bookTitle: book.title,
      bookAuthor: book.author,
      bookCategory: book.category,
      bookPages: book.pages,
      bookId: book.id,
      userName: username,
      orderQuantity: quantity,
    };
    axios
      .post("http://localhost:8081/order", orderData)
      .then(() => {
        setOrderSuccess(true); // Set the success message to true

        setTimeout(() => {
          setOrderSuccess(false); // Reset the success message after 3 seconds
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const [review, setReview] = useState({
    reviewer: username,
    rating: "",
    text: "",
    book: id,
  });
  function submitReview() {
    if (!review.text) {
      setReviewError("Please enter a review");
      return;
    }
    const reviewData = {
      ...review,
      reviewer: username,
      rating: rating,
    };

    axios
      .post("http://localhost:8081/review", reviewData)
      .then((response) => {
        const newReview = response.data;
        setReviews((prevReviews) => [...prevReviews, newReview]);
        setRating(0);
        setReview((prevReview) => ({ ...prevReview, text: "" }));
        setReviewError(""); // Reset the error message
      })
      .catch((error) => {
        console.error(error);
      });
  }
  useEffect(() => {
    console.log(review);
  }, [review]);

  const loadBook = async () => {
    const result = await axios.get(`http://localhost:8081/book/${id}`);
    setBook(result.data);
  };
  const [reviews, setReviews] = useState([]);
  const loadReviews = async () => {
    const result = await axios.get(`http://localhost:8081/reviews/book/${id}`);
    setReviews(result.data);
  };

  function updateReview(value) {
    setReview((prevReview) => ({ ...prevReview, text: value }));
  }

  const [quantity, setQuantity] = useState(1);

  const [ratedValue, setRatedValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(0);
  const [rating, setRating] = useState(0);

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleStarHover = (value) => {
    setHoverValue(value);
  };

  const handleStarLeave = () => {
    setHoverValue(0);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className="rating-star"
          color={
            (hoverValue || rating) >= i
              ? "#ffbf00" // Sao được chọn hoặc đang hover
              : "#ccc" // Sao không được chọn
          }
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => handleStarHover(i)}
          onMouseLeave={handleStarLeave}
        />
      );
    }
    return stars;
  };

  const handleKeyPress = (event) => {
    if (event.key === "0" || event.key === "-") {
      event.preventDefault();
    }
  };

  return (
    <div>
      {orderSuccess && (
        <div className="alert alert-success mt-3" role="alert">
          Added successfully! Please check your cart.
        </div>
      )}
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
                  min="1"
                  onKeyPress={handleKeyPress}
                  style={{ width: "80px" }}
                  value={quantity} // Bind the value to the quantity state
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <div>
                  {localStorage.getItem("assessItems") ? (
                    <button
                      className="btn btn-outline-dark"
                      style={{ width: "110px" }}
                      onClick={() => submitOrder()}
                    >
                      BUY NOW
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {localStorage.getItem("assessItems") ||
        localStorage.getItem("assessToken") ? (
          <div>
            <div className="form-group">
              <label htmlFor="review" className="h4">
                Let everyone know your review :
              </label>

              <div className="rating mb-3">{renderStars()}</div>
              <textarea
                className="form-control"
                id="review"
                rows="3"
                name="commment"
                onChange={(e) => updateReview(e.target.value)}
                required
              ></textarea>
              {reviewError && <p className="text-danger">{reviewError}</p>}
            </div>
            <button
              className="btn btn-outline-dark"
              onClick={() => submitReview()}
            >
              Submit Review
            </button>
            <hr />
          </div>
        ) : (
          <h4 className="text-center">Login to review</h4>
        )}
      </div>
      <div>
        <h4>Comments</h4>
        {reviews.map((review) => (
          <div key={review.id}>
            <p className="h5">
              {review.reviewer} rated {review.rating} stars
            </p>
            <p>{review.text}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookDetails;
