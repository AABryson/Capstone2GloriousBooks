//Checked
import React, {useState} from 'react'
import {Routes, Route} from 'react-router-dom'
import ContextObject from './ContextObject'
import NavBar from './NavBar'
import HomePage1 from './HomePage1'
import SearchByAuthor from './SearchByAuthor'
import SearchByTitleNew from './SearchByTitleNew'
import SearchBySubjectNew from './SearchBySubjectNew'
import SearchBookshelves from './library'
import SearchBooks from './SearchBooks'
import Callback from './callback'
import Signup from './credentials/Signup'
import Login from './credentials/Login'


function App() {

  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [user, setUser] = useState('')
  const [authToken, setAuthToken] = useState('')
  const [books, setBooks] = useState([])
  const [loggedIn, setLoggedIn] = useState('');
  
  
  return (
    <div className='container-fluid p-0'>

      <ContextObject.Provider value={{author, setAuthor, title, setTitle, subject, setSubject, user, setUser, authToken, setAuthToken, books, setBooks, loggedIn, setLoggedIn}}>
        <NavBar />
        <Routes>
          <Route path='/' element={<HomePage1 />} />
          <Route path='/author' element={<SearchByAuthor />} />
          <Route path='/subject' element={<SearchBySubjectNew />} />
          <Route path='/title' element={<SearchByTitleNew />} />
          <Route path='/library' element={<SearchBookshelves />} />
          <Route path='/books/:id' element={<SearchBooks />} />
          <Route path='/signup' element={<Signup />}  />
          <Route path='/login' element={<Login />} />
          <Route path='/callback' element={<Callback />} />
        </Routes>
      </ContextObject.Provider>

    </div>
  )
}

export default App
