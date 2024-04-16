import React, {useState} from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../apiConfig';

const Registration = () => {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

   const handleFormSubmit = (e) => {
    e.preventDefault();
    //console.log(email, password)

    const data = {
        email: email,
        password: password
    }
    console.log(data);

    axios.post(`${API_BASE_URL}account/register`, data)
    .then((result) => {
        const dt = result.data;
    })
    .catch((error) => {
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
                            <h1>User Registration</h1>
                            </div>
                            <div className="card-body">
                                <div>
                                    <label for="exampleInputEmail1" class="form-label mt-4">Email address</label>
                                    <input 
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
                                    <input 
                                    type="password" 
                                    class="form-control" 
                                    id="exampleInputPassword1" 
                                    placeholder="Enter password"
                                    onChange= {(e) => setPassword(e.target.value)}
                                    />
                                    
                                </div>
                            <div className="card-footer">
                            <button type="Register" class="btn btn-primary" onClick={(e) => handleFormSubmit(e)}>
                            Register
                            </button>
                            </div>
                            </div>
                        </div>
                    </form>
                </div>
            </form>   
        </div>
    );
}

export default Registration;