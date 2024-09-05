
import React, {useState, useContext} from 'react'
// import JoblyApi from './api'
import ContextObject from '../ContextObject'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function Login () {
//register new user; username, password, email
    //state for info entered into input
    const [loginData, setLoginData] = useState({username:'', password:'', email:''})
    //state for user credentials/information
    const{user, setUser} = useContext(ContextObject)
    const {token, setToken} = useContext(ContextObject)

    let baseURL = 'https://capstone2gloriousbooks.onrender.com'
    //post request to api; includes user info
    async function sendInfo(user) {
        let response = await axios.post(`${baseURL}/users/login`, user)
            console.log('response from axios request to /login', response)
        return response.data
    }

    let navigate = useNavigate()
    // const {setToken} = useContext(ContextObject)
    function handleChange (e) {
        const {name, value} = e.target
        //#####################################({
        setLoginData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    async function handleSubmit (e) {
        e.preventDefault()
        //execute function that sends post request to api
        // let token = await JoblyApi.signUp(signupData)
        // setToken(token)
        setUser(loginData)
        //clear inputs
        setLoginData({username:'', password:'', email:''})
        
        let response = await sendInfo(loginData)
        console.log('data possibly passed to endpoint', response)

        navigate('/')
        console.log('loginData added to user state', loginData)

        
        
    }

    return (
        <>
        <div className='container-fluid text-start'>
            <h1>Login page</h1>
                <form onSubmit={handleSubmit}>
                    <div className='row my-3'>
                        <div className='col-1'>
                            <label htmlFor='username'>Username</label>
                        </div>
                        <div className='col-10'>
                            <input type='text' id='username' name='username' value={loginData.username} onChange={handleChange}/>
                        </div> 
                    </div>
                    <div className='row my-3'>
                        <div className='col-1'>
                                <label htmlFor='password'>Password</label>
                        </div>
                        <div className='col-10'>
                                <input type='text' id='password' name='password' value={loginData.password} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className='row my-3'>
                        <div className='col-1'>
                                <label htmlFor='email'>Email</label>
                        </div>
                        <div className='col-10' >
                            <input type='text' id='email' name='email' value={loginData.email} onChange={handleChange}/>
                        </div>
                    </div>
                        <button type='submit' className='btn btn-light mb-3'>Submit</button>
                </form>
                <div className='row'>
                    <div className='col-12 p-0 m-0'>
                        <div style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/A_Young_Man_Reading_by_Candlelight_%28Matthias_Stom%29_-_Nationalmuseum_-_23887.tif/lossy-page1-800px-A_Young_Man_Reading_by_Candlelight_%28Matthias_Stom%29_-_Nationalmuseum_-_23887.tif.jpg', backgroundSize:'cover', backgroundPosition:'center', height: '400px', width:'100%', margin:'0'}}>
                        </div>
                        
                    </div>
                </div>
                
        </div>
        </>
    )
}
export default Login