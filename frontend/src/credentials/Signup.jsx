import React, {useState, useContext} from 'react'
// import JoblyApi from './api'
import ContextObject from '../ContextObject'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function Signup() {
    //register new user; username, password, email
    //state for info entered into input
    const [signupData, setSignupData] = useState({ username: '', password: '', email: '' })
    //state for user credentials/information
    const { user, setUser } = useContext(ContextObject)
    const { authToken, setAuthToken } = useContext(ContextObject)

    let baseURL = 'https://capstone2gloriousbooks.onrender.com'
    //post request to api; includes user info
    async function sendInfo(user) {
        let response = await axios.post(`${baseURL}/users/signup`, user)
        console.log('response from axios request to /signup', response)
        return response.data
    }

    let navigate = useNavigate()
    // const {setToken} = useContext(ContextObject)
    function handleChange(e) {
        const { name, value } = e.target
        //#####################################({
        setSignupData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        //execute function that sends post request to api
        // let token = await JoblyApi.signUp(signupData)
        // setToken(token)
        setUser(signupData)
        //clear inputs
        setSignupData({ username: '', password: '', email: '' })
        
        let response = await sendInfo(signupData)
        console.log('data possibly passed to endpoint', response)
        function locate(url) {
            window.location.href = url
        }
        async function auth() {
            const response = await fetch('http://127.0.0.1:3001/request', { method: 'post' })
            const data = await response.json();
            locate(data.url);
        }
        auth()

        navigate('/')
        console.log('signupData added to user state', signupData)
    }

        return (
            <>
                <div className='container-fluid text-start'>
                    <h1>Signup page</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='row my-3'>
                            <div className='col-1'>
                                <label htmlFor='username'>Username</label>
                            </div>
                            <div className='col-10'>
                                <input type='text' id='username' name='username' value={signupData.username} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='row my-3'>
                            <div className='col-1'>
                                <label htmlFor='password'>Password</label>
                            </div>
                            <div className='col-10'>
                                <input type='text' id='password' name='password' value={signupData.password} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='row my-3'>
                            <div className='col-1'>
                                <label htmlFor='email'>Email</label>
                            </div>
                            <div className='col-10' >
                                <input type='text' id='email' name='email' value={signupData.email} onChange={handleChange} />
                            </div>
                        </div>
                        <button type='submit' className='btn btn-light mb-3'>Submit</button>
                    </form>
                    <div className='row d-flex'>
                        <div className='col-12 p-0'>
                            <div style={{ backgroundImage: 'url(https://i.etsystatic.com/9932839/r/il/4eed08/3583727672/il_570xN.3583727672_gvql.jpg', backgroundSize: 'cover', backgroundPosition: 'center', height: '500px', width: '100%' }}>
                            </div>
                        
                        </div>
                    </div>
                
                </div>
            </>
        )
    }

export default Signup