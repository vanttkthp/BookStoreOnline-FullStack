
import BookService from "../service/BookService";
import Footer from "./admin/Footer";
import ImagePreview from "./admin/ImagePreview";
import { createBrowserHistory } from 'history';
import React, { Component } from 'react';

class BookDetailsforAdmin extends Component {
  history = createBrowserHistory();
  constructor(props){
    super(props)
    this.state = {
      title: '',
      author: '',
      description:'',
      publishedDate:'',
      pages:'',
      category:'',
      bookCover:''

    }
    this.changeTitleHandler = this.changeTitleHandler.bind(this);
    this.changeAuthorHandler = this.changeAuthorHandler.bind(this);
    this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
    this.changePublishedDateHandler = this.changePublishedDateHandler.bind(this);
    this.changePagesHandler = this.changePagesHandler.bind(this);
  }
  saveBook = (e) => {
    e.preventDefault();
    let book = {title: this.state.title, author:this.state.author,
      description:this.state.description,
      publishedDate:this.state.publishedDate,
      pages:this.state.pages,
      category:this.state.category,
      bookCover:this.state.bookCover
    };
    console.log('book => ' +JSON.stringify(book));
    BookService.addNewBook(book).then(res =>{
      this.props.history.push('/booklistforadmin');
    });
  }
  changeTitleHandler= (event) => {
    this.setState({title:event.target.value});
  }
  changeAuthorHandler= (event) => {
    this.setState({author:event.target.value});
  }
  changeDescriptionHandler= (event) => {
    this.setState({description:event.target.value});
  }
  changePublishedDateHandler= (event) => {
    this.setState({publishedDate:event.target.value});
  }
  changePagesHandler= (event) => {
    this.setState({pages:event.target.value});
  }
  render() {
    return (
      <div class="container mt-5 card shadow border" style={{ backgroundColor: "#f2f2f2" }}>
      <div class="row">
        <div class="col-md-6">
          <h2>Book Information</h2>

          <div class="form-group">
            <label htmlFor="book-title">Title</label>
            <input
              type="text"
              class="form-control"
              id="book-title"
              placeholder="Enter book title"
              value={this.state.title}
              onChange={this.changeTitleHandler}
            />
          </div>

          <div class="form-group">
            <label htmlFor="book-author">Author</label>
            <input
              type="text"
              class="form-control"
              id="book-author"
              placeholder="Enter book author"
              value={this.state.author}
              onChange={this.changeAuthorHandler}
            />
          </div>
          <div class="form-group">
            <label htmlFor="book-description">Description</label>
            <textarea
              class="form-control"
              id="book-description"
              rows="3"
              value={this.state.description}
              onChange={this.changeDescriptionHandler}
            ></textarea>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label htmlFor="book-release-date">Published Date</label>
              <input 
              type="date" 
              class="form-control" 
              id="book-release-date" 
              value={this.state.pages}
              onChange={this.changeTitleHandler}
              />
            </div>
            <div class="form-group col-md-6">
              <label htmlFor="book-pages">Pages</label>
              <input type="number" 
              class="form-control" 
              id="book-pages" 
              value={this.state.pages}
              onChange={this.changePagesHandler}
              />
            </div>
          </div>
          <div class="form-group">
            <label for="book-category">Category</label>
            <select class="form-control" id="book-category">
              <option>Select a category</option>
              <option>Science Fiction</option>
              <option>Horror</option>
              <option>Romance</option>
              <option>Thriller</option>
            </select>
          </div>
          <button className="btn-btn-success" onClick={this.saveBook}>Save</button>
        </div>
        <div class="col-md-6">
          <h2>Upload Book Cover</h2>
          <div class="form-group">
            <label for="book-cover">Choose a file</label>
            <div class="mb-3">
              <ImagePreview />
            </div>
          </div>
        </div>
        <Footer/>
      </div>
      
    </div>
    
    );
  }
}

export default BookDetailsforAdmin;
