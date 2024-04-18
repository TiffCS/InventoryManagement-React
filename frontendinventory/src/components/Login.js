import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { API_BASE_URL } from '../apiConfig';

const Login = () => {
        const[email, setEmail] = useState('');
        const[password, setPassword] = useState('');
        const[errMsg, setErrMsg] = useState('');

        //Clear error message when user enters input
        useEffect(() => {
        setErrMsg('');
        }, [email, password])

        const navigate=useNavigate()

        const handleLogin = (e) => {
        e.preventDefault();
        console.log(email, password)

        const data = {
            email: email,
            password: password
        }
        console.log(data);

        axios.post(`${API_BASE_URL}account/login`, data)
        .then((result) => {
            console.log(result)
            navigate('/home');
        })
        .catch((error) => {
            if(!error?.response) {
                setErrMsg('No server response.');
            } else if (error.response?.status === 400) {
                setErrMsg('Missing email or password.');
            } else if (error.response?.status === 401)
            {
                setErrMsg('Invalid login attempt.')
            } else {
                setErrMsg('Login Failed.')
            }
            console.log(error);
        })
        }

        
    
        
    
        return (
            <div>
               <form>
                    <div className="offset-lg-3 col-lg-6">
                        <form className ="container">
                            <div className="card">
                                <div className="card-header">
                                <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                                <h1>User Login</h1>
                                </div>
                                <div className="card-body">
                                    <div>
                                        <label for="exampleInputEmail1" class="form-label mt-4">Email address</label>
                                        <input required
                                        type="email" 
                                        class="form-control" 
                                        id="exampleInputEmail1" 
                                        aria-describedby="emailHelp" 
                                        placeholder="Please enter email"
                                        onChange= {(e) => setEmail(e.target.value)}
                                        />
                                        
                                    </div>
                                    <div>
                                        <label for="exampleInputPassword1" class="form-label mt-4">Password</label>
                                        <input required
                                        type="password" 
                                        class="form-control" 
                                        id="exampleInputPassword1" 
                                        placeholder="Enter password"
                                        onChange= {(e) => setPassword(e.target.value)}
                                        />
                                        
                                    </div>
                                <div className="card-footer">
                                <button type="Login" class="btn btn-primary" onClick={(e) => handleLogin(e)}>
                                Login
                                </button>
                                <p>
                                    Not Registered? <Link to ="/register">Register Here</Link>
                                </p>
                                </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </form>   
            </div>
        );
}

export default Login;