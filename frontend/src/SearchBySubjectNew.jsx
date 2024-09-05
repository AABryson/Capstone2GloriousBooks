//Checked
import React, {useState, useContext} from 'react'
import axios from 'axios'
import ContextObject from './ContextObject'
import './SearchBySubjectNew.css'

function SearchBySubjectNew() {
    
    const {subject, setSubject} = useContext(ContextObject)
    const {authToken} = useContext(ContextObject)
    const [input, setInput] = useState('')
    const [addingBook, setAddingBook] = useState(false)

    let BASE_URL = 'https://www.googleapis.com/books/v1/volumes?q='

    const apiKey = 'AIAIzaSyBJo7SCNGuT27ZbgzdgO0R9t-UT4nrERsA';

    async function handleSubmit(evt) {
        evt.preventDefault()

        let response = await axios.get(`${BASE_URL}subject:${input}&maxResults=40&key=AIzaSyCb0W-9jMh6sviCF2ugUnLp_Sc-D5Z0sWI`)

        setSubject(response.data.items)
        setInput('')  
    }
    
    function handleChange(evt) {
        let value = evt.target.value
        setInput(value)
    }

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

    function renderInfo(item) {
        return subject.map((item, index) => (
            <div className='card text-start ms-5 me-5' style={{ backgroundColor: 'rgb(242, 242, 242, 0.7)', marginBottom: '12px', width: '92%'}} key={index}>
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
                            {item.volumeInfo.previewLink ? (
                                <a href={item.volumeInfo.previewLink} className='btn btn-secondary align-self-center' role='button'>Preview</a>

                            ) : null}
                        </div>
                                            
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
            {!subject ? (
                <h3 className='pt-4' id='searchSubject'>Search by subject</h3>
            ) : (null)
            }
        </div>
        <div className='row pb-4'>
        
            <form onSubmit={handleSubmit}>
                <div id='handleSubmit'>
                    <label htmlFor='subject' id='labelSubject'>Subject</label>
                    <input type='text' id='inputSubject' value={input} onChange={handleChange} name='subject'/>
                        <button className='btn btn-light' id='searchButton' type='submit'>Search</button>
                </div>
            </form>
        </div>
       
        {!subject ? (
            <div id='images'>
                <div id='pol'></div>
                <div id='fut'></div>
                <div id='phys'></div>
                <div id='art'></div>
            </div>
            ) : (
            null
            )}S
        
        <div className='row'>
        {subject ? (
            <>
            {renderInfo(subject)}
            </>
        ) : (
            null
        )}
        </div>
    </div>
    </>
    )
}

export default SearchBySubjectNew
