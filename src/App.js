import React from "react";
import ListBookComponents from "./components/ListBookComponents.jsx";
import BookShopList from "./components/BookShopList.jsx";
import Header from "./components/Header.jsx";
import BookDetailsforAdmin from "./components/BookDetailsforAdmin.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import MyButton from "./components/MyButton.jsx";

import LoginPage from "./components/LoginPage.jsx";
import Footer from "./components/admin/Footer.jsx";

import BookInformation from "./components/admin/BookInformation.jsx";
import AddBook from "./components/admin/AddBook.jsx";
import ViewBook from "./components/admin/ViewBook.jsx";
import EditBook from "./components/admin/EditBook.jsx";
import Login from "./components/Pages/Login.jsx";
import Signup from "./components/Pages/Signup.jsx";
import BookDetails from "./components/BookDetails.jsx";




function App() {
  return (
    <BrowserRouter>
    <div className="mb-4">
      <Header/>
    </div>
        <div className="container">
         
        
          <Routes>
            <Route path="/" exact element={<BookShopList />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/book-detail" element={<AddBook/>} />
            <Route path="/bookshoplist" element={<BookShopList />} />
            <Route path="/booklistforadmin" element={<ListBookComponents />} />
            <Route path="/bookinfo" element={<BookInformation />} />
            <Route path="/book-detail/:id" element={<ViewBook/>} />
            <Route path="/book-detail/:id/edit" element={<EditBook/>} />
            <Route path="/book/:id" element={<BookDetails/>} />
          </Routes>
          
          </div>
      
    </BrowserRouter>
  );
}

export default App;
