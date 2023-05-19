import React, { Component } from 'react';
import BookService from '../service/BookService';
import MyButton from './MyButton';
import { Link } from 'react-router-dom';

class ListBookComponents extends Component {
    constructor(props){
        super(props)
        this.state = {
            books: []
        }
   
    }
    componentDidMount(){
        BookService.getBooks().then((res) =>{
            this.setState({books:res.data});
        });
    }
   
    
    render() {
        return (
            <div className='container card shadow border mb-5' style={{ backgroundColor: "#f2f2f2"}}> 
                <h2 className='text-center'>Books List</h2>
                
                <div className='row'>
                    <table className='table table-striped table-bordered '>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Category</th>
                                <th>Published Date</th>
                                <th>Pages</th>
                                <th>Sold  Quantity</th>
                                <th>Actions</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.books.map(
                                    book =>
                                    <tr key = {book.id}>
                                        <td>{book.id}</td>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>{book.category}</td>
                                        <td>{book.publishedDate}</td>
                                        <td>{book.pages}</td>
                                        <td>{book.soldQuantity}</td>
                                        <td></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className='row'>
                <Link to={`/add-book`}  className='btn btn-primary'  style={{ backgroundColor: '#f2f2f2',color: 'black'}}>
                    ADD NEW BOOK
                </Link>
                </div>
            </div>
        );
    }
} 

export default ListBookComponents;