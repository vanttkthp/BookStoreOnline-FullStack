import React, { useEffect, useState } from "react";
import axios from "axios";


export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const username = localStorage.getItem("userName");
  useEffect(() => {
    fetchCartItems();
  }, []);
  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/order/${username}`
      );
      setCartItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/order/${id}`);
      fetchCartItems();
    } catch (error) {
      console.error(error);
    }
  };
  function handleDeleteClick(id) {
    deleteOrder(id);
  }

  const updateStatus = async (id) => {
    try {
      await axios.put(`http://localhost:8081/order/${id}`, {
        orderStatus: true,
      });
      fetchCartItems();
    } catch (error) {
      console.error(error);
    }
  };
  const updateOrder = async (id) => {
    try {
      await axios.put(`http://localhost:8081/order/${id}`, {
        orderStatus: true,
        quantity: cartItems.find((item) => item.id === id).orderQuantity,
      });
      fetchCartItems();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      className="container card shadow border mb-5"
      style={{ backgroundColor: "#white" }}
    >
      <div className="container">
        <div className="py-4">
          <h2 className="text-center">YOUR CART</h2>
          <div className="row"></div>
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Category</th>
                <th scope="col">Pages</th>
                <th scope="col">Quantity</th>

                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <a
                      href={`/book/${item.bookId}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {item.bookTitle}
                    </a>
                  </td>
                  <td>{item.bookAuthor}</td>
                  <td>{item.bookCategory}</td>
                  <td>{item.bookPages}</td>
                  <td>{item.orderQuantity}</td>

                  <td>
                    {item.orderStatus ? (
                      <span className="text-dark">&#x2713;</span>
                    ) : (
                      <span className="text-danger">&#x2717;</span>
                    )}
                  </td>
                  <td>
                    {item.orderStatus ? (
                      <span className="text-dark">Order successfully</span>
                    ) : (
                      <div>
                        <button
                          className="btn btn-outline-dark mx-2"
                          onClick={() => updateOrder(item.id)}
                        >
                          Order
                        </button>
                        <button
                          className="btn btn-outline-danger mx-2 "
                          onClick={() => handleDeleteClick(item.id)}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <Link
            to="/book-detail"
            className="btn btn-outline-primary shadow btn-white btn-block"
            
          >
            
          </Link> */}
        </div>
      </div>
    </div>
  );
}
