
import React, {useState, useContext} from 'react'
import axios from 'axios'
import ContextObject from './ContextObject'
import './SearchByAuthor.css'

function SearchByAuthor() {
    //several states from App.jsx
    const {author, setAuthor} = useContext(ContextObject)
    //the token that is stored after oauth2 process
    const {authToken} = useContext(ContextObject)
    const [input, setInput] = useState('')
    const [addingBook, setAddingBook] = useState(false)

    let BASE_URL = 'https://www.googleapis.com/books/v1/volumes?q='
    //The key that google uses to identify the application
    const apiKey = 'AIzaSyBJo7SCNGuT27ZbgzdgO0R9t-UT4nrERsA';

    async function handleSubmit(evt) {
        evt.preventDefault()
        //only 40 books can be returned
        let response = await axios.get(`${BASE_URL}inauthor:${input}&maxResults=40&key=AIzaSyCb0W-9jMh6sviCF2ugUnLp_Sc-D5Z0sWI`)
        //sets author state with array of objects containing individual book information
        setAuthor(response.data.items)
        setInput('')  
    }
    //each time a user types text into the search bar, it is set to the input state
    function handleChange(evt) {
        let value = evt.target.value
        setInput(value)
    }
    //function for adding books to the user's bookshelves
    async function handleAddTo(id, authToken, num) {
        //prevent duplicate calls
        if (addingBook) return; 
        //set state to show adding a book
        setAddingBook(true); 
        try {
            const response = await axios.post(
                `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${num}/addVolume?volumeId=${id}`,
                {},
                {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
                }
            );
            
        } catch(error) {
            console.error('Error adding book:', error);
        } finally {
            setAddingBook(false); 
        }
    }
    //creates an individual card for each book returned; shows pertinent information
    function renderInfo(item) {
        //author is an array; run callback function on each element and extract info for card
        return author.map((item, index) => (
            <div className='card text-start ms-5 me-5' style={{ backgroundColor: 'rgb(242, 242, 242, 0.7)', marginBottom: '12px', width:'92%' }} key={index}>
                <div className='card-body col-12'>
                    <h4 className='card-title' id='cardTitle'>{item.volumeInfo.title}</h4>
                    <h5 className='card-title' id='cardTitle'>{item.volumeInfo.subtitle}</h5>
                    <h5 className='card-subtitle mb-2' id='cardSubTitle'>{item.volumeInfo.authors}</h5>

                    <div className='row'>
                        <div className='col-xs-12 col-sm-9 mx-3' style={{borderLeft: 'solid black 2px'}}>
                            <p className='card-text' >{item.volumeInfo.description}</p>
                        </div>
                        <div className='col-xs-12 col-sm-2 text-center'>
                            {item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail ? (
                                <img src={item.volumeInfo.imageLinks.thumbnail} alt="Thumbnail" />
                            ) : (
                                null
                            )}
                        </div>
                    </div>
                    {/* if the book has an average rating, it is displayed **/}
                    <div className='row pt-2' style={{height:'30px'}}>
                        <div className='col-4'>
                            {item.volumeInfo.averageRating ? (
                                <div>
                                    <p style={{color:'#858585'}}>Average rating: {item.volumeInfo.averageRating}</p>
                                </div>
                            ) : (
                                null
                            )}
                        </div>
                    </div>
                </div>

                <div className='card-footer border-top border-danger'>
                    <div className='row'>
                        <div className='col-4'>
                            {/*if the book is available to buy from google books, button appears with link to goole books site **/}
                            {item.saleInfo.buyLink ? (
                                <>
                                <h5 style={{ fontSize: '14px' }}>Purchase from</h5>
                                
                                    <div className='row'>
                                        <div className='col-3'>
                                            <a href={item.saleInfo.buyLink} className='card-link btn' id='cardLinkBtn'>Google</a>
                                        </div>
                                    </div>
                                </>
                                ) : (
                                null)}
                        </div>
                        
                        <div className='col-2 d-flex'>
                            {/* this links to the google books preview page; the user can look at a book sample **/}
                            {item.volumeInfo.previewLink ? (
                                <a href={item.volumeInfo.previewLink} className='btn btn-secondary align-self-center' role='button'>Preview</a>
                            ) : null}
                        </div>
                            {/* user can add book to one of their bookshelves **/}                
                        <div className='col-2 d-flex'>
                            <button className='btn btn-secondary dropdown-toggle align-self-center' type='button' data-bs-toggle='dropdown'>Add to</button>
                            <ul className='dropdown-menu'>
                                {/* Add the correct href attribute here */}
                                {/**began working on dropdown and navlin */}
                                <li className='dropdown-item' onClick={() =>  handleAddTo(item.id, authToken, 0)}>Favorites</li>
                                <li className='dropdown-item' onClick={() =>  handleAddTo(item.id, authToken, 2)}>To Read</li>
                                <li className='dropdown-item' onClick={() =>  handleAddTo(item.id, authToken, 4)}>Have Read</li>
                                <li className='dropdown-item' onClick={() =>  handleAddTo(item.id, authToken, 5)}>Reviewed</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        ));
    }

    return (
    <>
    <div className='container-fluid text-center p-0' id='backgroundColor'>
        <div className='row'>
            {/*if the author state is empty, show the search bar along with the title below  **/} 
            {!author ? (
                <h3 className='pt-4' id='searchAuthor'>Search by author</h3>
            ) : (null)
            }
        </div>

        <div className='row pb-4'>
            {/*when users submit their inquiry, the title for the searchbar disappears **/}
            <form onSubmit={handleSubmit}>
                <div id='handleSubmit'>
                    <label htmlFor='author' id='labelAuthor'>Author</label>
                    <input type='text' id='inputAuthor' value={input} onChange={handleChange} name='author'/>
                        <button className='btn btn-light' id='searchButton' type='submit'>Search</button>
                </div>
            </form>
        </div>
        {/*while the author state is empty, show pictures of famous authors**/}
        {!author ? (
        <div id='images'>
            <div id='bronte'></div>
            <div id='orwell'></div>
            <div id='wilde'></div>
            <div id='milton'></div>
            <div id='wolfe'></div>
            <div id='shelly'></div>
        </div>
        ) : (
            null
        )}
        
        <div className='row'>
            {/*once data has been added to the author state, call render info and show information about the books **/}
            {author ? (
                <>
                {renderInfo(author)}
                </>
            ) : (
                null
            )}
        </div>
    </div>
    </>
    )
}

export default SearchByAuthor
