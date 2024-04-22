import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../apiConfig';
import { useNavigate, Link } from 'react-router-dom';

import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Email and password pattern to check email and password
const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const Registration = () => {

    // State for email input, for email validation, for focus on email input field 
    const[email, setEmail] = useState('');
    const[validEmail, setValidEmail] = useState(false);
    const[emailFocus, setEmailFocus] = useState(false);

     // State for  password input, for password validation, for focus on passwordinput field 
    const[password, setPassword] = useState('');
    const[validPassword, setValidPassword] = useState(false);
    const[passwordFocus, setPasswordFocus] = useState(false);

    // State for error message to be displayed 
    const[errMsg, setErrMsg] = useState('');

    // Validate the email each time it changes 
    useEffect(() => {
        const result = emailRegex.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
    }, [email])

    // Validate the password each time it changes 
    useEffect(() => {
        const result = passwordRegex.test(password);
        console.log(result);
        console.log(password);
        setValidPassword(result);
    }, [password])

    // Clear error message when email or password is changed
    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    // Navigation to endpoints
    const navigate=useNavigate()

    // Actions to be performed when the form is submitted
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password)

        // Clear email and password input field
        setEmail('');
        setPassword('');

        // Navigation  to login page if successful or error is displayed
        try {
            await axios.post(`${API_BASE_URL}account/register`, {email:email, password:password})
            navigate('/login');
        } catch(error) {
            if (!error.response){
                setErrMsg('No response from server.')
            } else if (error.response?.status === 400)
            {
                setErrMsg('This email is already in use.')
            } else { 
                setErrMsg('User registration failed.')
            }
            
            console.log(error);
        }
    }

    return (
        <section>
            <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
            <h1>User Registration</h1>
           <form onSubmit={handleFormSubmit}>
                <label for="InputEmail" class="form-label mt-4"> 
                    Email address
                    <span className={validEmail ? "valid" : "hide"}>
                        <FontAwesomeIcon icon = {faCheck} />
                    </span>
                    <span className = {validEmail || !email? "hide": "invalid"}>
                        <FontAwesomeIcon icon = {faTimes} />
                    </span>
                </label>
                <input 
                    required
                    type="email" 
                    class="form-control" 
                    id="InputEmail"
                    value = {email}
                    autoFocus
                    autoComplete="off"
                    placeholder="@gmail.com"
                    onChange= {(e) => setEmail(e.target.value)}
                    aria-describedby="emailHelp" 
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                />
                <p id ="emailHelp" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                        Only letters a-z, numbers 0-9 and periods allowed.
                </p>
    
                <label for="InputPassword" class="form-label mt-4">
                    Password
                    <span className= {validPassword ? "valid" : "hide"}>
                        <FontAwesomeIcon icon = {faCheck} />
                    </span>
                    <span className = {validPassword || !password ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon = {faTimes} />
                    </span>
                </label>
                <input 
                    required
                    type="password" 
                    class="form-control" 
                    id="InputPassword" 
                    value = {password}
                    placeholder="Enter password"
                    onChange= {(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                />
                <p className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                        Atleast 6 characters. <br />
                        Must begin with a letter. <br />
                        Atleast one character has to be uppercase and lowercase. <br />
                        Password also requires a non-Aphanumeric character.
                </p>              
                <button type="Register" class="btn btn-primary" disabled={!validEmail || !validPassword}>
                    Register
                </button>
                <p>
                    Already Registered? <Link to ="/login">Login</Link>
                </p>
            </form>
        </section>   
    );
}

export default Registration;