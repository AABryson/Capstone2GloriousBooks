
import React, {useState, useContext} from 'react'
import axios from 'axios'
import ContextObject from './ContextObject'
import {NavLink} from 'react-router-dom'




function SearchBySubject() {
    console.log('SearchBySubject page')
    
    const {subject, setSubject} = useContext(ContextObject)
    const [queryString, setQueryString] = useState('')
    const [input, setInput] = useState('')


    let BASE_URL = 'https://www.googleapis.com/books/v1/volumes?q='

    async function handleSubmit(evt) {
        evt.preventDefault()

        let response = await axios.get(`${BASE_URL}subject:${input}&maxResults=40&key=AIzaSyCb0W-9jMh6sviCF2ugUnLp_Sc-D5Z0sWI`)
        console.log('items from subject api call', response.data.items)
        console.log('response.data from subject api call', response.data)

        setSubject(response.data.items)
        setInput('')  
    }
    
    function handleChange(evt) {
        let value = evt.target.value
        setInput(value)
    }
    
    console.log('what is in subject state', subject)

    function renderInfo(subject) {
        return subject.map((item, index) => (
        <>
            <div className='card text-start' style={{backgroundColor: 'rgb(242, 242, 242, 0.7)', marginBottom:'12px'}} key={index}>
                
                <div className='card-body col-12'>                        
                    {console.log('item returned', item)}
                    <h4 className='card-title' style={{fontFamily:'garamond', fontWeight:'400'}}>{item.volumeInfo.title}</h4>
                    <h5 className='card-subtitle mb-2' style={{color:'#a84343', fontFamily:'calisto'}}>{item.volumeInfo.authors}</h5>
                    <div className='row'>
              
                        <div className='col-10 border-start'>
                            <p className='card-text'>{item.volumeInfo.description}</p>
                        </div>
                        <div className='col-2 text-center'>
                            {item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail ? (
                                    <img src={item.volumeInfo.imageLinks.thumbnail}>
                                    </img>
                                ) : (
                                    <img className='img-fluid' src='https://images.pexels.com/photos/1463376/pexels-photo-1463376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'></img>
                                )
                            }
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
                                        
                                            <a href={item.saleInfo.buyLink} className='card-link btn' style={{ backgroundColor: '#1B1B1F', color: 'white', fontSize: '10px' }}>Google</a>
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

        </>
            ));
        
        }

    return (
        
        
    <>
    <div className='container text-center'>
        
        {!subject ? (
                <h3 className='pt-3'>Search by subject</h3>
            ) : (null)
            }
        <div className='row pb-4'>

            <form onSubmit={handleSubmit}>
                <div className='container' style={{ paddingTop: '20px' }}>
                    <label htmlFor='subject' style={{marginLeft:'10px', fontSize:'24px', fontWeight:'500'}}>Subject</label>
                    <input type='text' id='subject' value={input} onChange={handleChange} name='subject' style={{marginLeft:'15px', width:'400px'}}/>
                        <button className='btn btn-light' type='submit' style={{marginLeft:'20px'}}>Search</button>
                </div>
        
            </form>
        </div>
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

export default SearchBySubject
