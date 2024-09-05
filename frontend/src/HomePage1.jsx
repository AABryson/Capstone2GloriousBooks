import React from 'react'
import {Link} from 'react-router-dom'
import './HomePage1.css'

function HomePage1 () {

    return (
        <div className='container-fluid p-0' id='containerHome'>
            <div className='row' id='titleArea'>
                {/*Main title **/}
                <div className='col-12 p-5' id='titleArea'>
                    <h1 id='title' className='display-1' >Glorious Books</h1>
                </div>
            </div>
            
            <div className='row'>
                <div className='col-12' id='searchBox'>
                    <h1 id='search'>Search for books using...</h1>
                </div>
            </div>
            {/**Row for author, title, subject */}
            <div className='row' id='images'>
            {/**Column for author and link to author page */}
                <div className='col-4' id='authorImage'>
                    <Link to='/author' id='link'>
                        <div id='titleBox'>
                            <h2 id='imageTitle'>Author</h2>
                        </div>
                    </Link>

                </div>
            {/**Column for title and link to title page */}
                <div className='col-4' id='titleImage'>
                    <Link to='/title' id='link'>
                        <div id='titleBox'>
                            <h2 id='imageTitle'>Title</h2>
                        </div>
                    </Link>
                </div>
            {/**Subject image and link to subject page */}
                <div className='col-4' id='subjectImage'> 
                    <Link to='/subject' id='link'>
                        <div id='titleBox'>
                            <h2 id='imageTitle'>Subject</h2>
                        </div>
                    </Link>
                </div>
            </div>
            <hr style={{backgroundColor: 'gray', height:'10px', marginTop:'50px'}}></hr>
            <h1 style={{color: 'white', textAlign: 'center', fontFamily: 'gill sans', fontWeight: '300'}}>To view the books in your library, please sign in to google using the sign in button above.</h1>
        </div>
    )
}

export default HomePage1