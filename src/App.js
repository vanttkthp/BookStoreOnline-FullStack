import React from "react";

import BookShopList from "./components/Pages/BookShopList.jsx";
import Header from "./components/Pages/Header.jsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";


import BookInformation from "./components/admin/BookInformation.jsx";
import AddBook from "./components/admin/AddBook.jsx";
import ViewBook from "./components/admin/ViewBook.jsx";
import Login from "./components/Pages/Login.jsx";
import Signup from "./components/Pages/Signup.jsx";
import BookDetails from "./components/Pages/BookDetails.jsx";

import Cart from "./components/Pages/Cart.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="mb-4">
        <Header />
      </div>
      <div className="container">
        <Routes>
          <Route path="/" exact element={<BookShopList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {localStorage.getItem("assessToken") ? (
            <>
              <Route path="/book-detail" element={<AddBook />} />
              <Route path="/bookshoplist" element={<BookShopList />} />
              
              
              <Route path="/book-detail/:id" element={<ViewBook />} />
            </>
          ) : null}

          <Route path="/bookinfo" element={<BookInformation />} />
          {/* <Route path="/book-detail/:id/edit" element={<EditBook/>} /> */}
          <Route path="/book/:id" element={<BookDetails />} />
          {localStorage.getItem("assessToken") || localStorage.getItem("assessItems") ? (
            <>
              <Route path="/cart" element={<Cart />} />
            </>
          ) : null}
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
