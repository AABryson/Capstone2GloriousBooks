import React, { useState, useEffect,useContext } from 'react';
import ContextObject from './ContextObject'
import axios from 'axios';
import { NavLink } from 'react-router-dom'
import './library.css'


function SearchBookshelves() {
    const [shelves, setShelves] = useState([]);
    const [books, setBooks] = useState([]);
    const {authToken, setAuthToken} = useContext(ContextObject)
    console.log(authToken)
    const apiKey = 'AIzaSyBJo7SCNGuT27ZbgzdgO0R9t-UT4nrERsA';

    async function getShelves() {
        const result = await axios.get(`https://www.googleapis.com/books/v1/mylibrary/bookshelves?key=${apiKey}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        console.log('bookshelves result', result.data.items);
        setShelves(result.data.items);
    }

    

    useEffect(() => {
        getShelves()
    }, [])

    console.log('shelves', shelves)
    console.log('shelves 0', shelves[0])
    console.log(authToken)
//separate these two components; on one page return bookshelf titiles and then link to separate pages which dispaly the books
    
    let evenShelves = []
    let oddShelves = []

    shelves.forEach((item, index) => {
        if(index % 2 === 0) {

            evenShelves.push(item)
        } else { 
            oddShelves.push(item)
        }
    })

    return (
        
        <div className='container-fluid' id='containerLibrary'>
            <div className='row'> 
                <div className='col-12 p-0'>
                    <h1 className='text-end p-5' id='mainTitle'>Your Library</h1>
                    
                </div>
            </div>

            <div className='row'>
                {evenShelves.map((shelf, index) => (
                    <div className='col-md-12 col-lg-6 p-1'>
                        <div className='card text-start'  id='cardText'>
                            <div className='card-body col-6'>
                                <h1 className='card-title'><NavLink to={`/books/${shelf.id}`} className='nav-link' id='navLink'>{shelf.title}</NavLink></h1>
                            </div>

                        </div>
                    </div>
                ))
                }

                {oddShelves.map((shelf, index) => (
                    <div className='col-md-12 col-lg-6 p-1'>
                        <div className='card text-start' id='cardText' style={{backgroundColor: 'rgba(234, 234, 234, .8)'}}>
                            <div className='card-body col-6'>
                                <h1 className='card-title'><NavLink to={`/books/${shelf.id}`} className='nav-link' id='navLink'>{shelf.title}</NavLink></h1>
                            </div>
                        </div>
                    </div>
                ))
                }

            </div>
        </div>
    

    );
}

export default SearchBookshelves;
