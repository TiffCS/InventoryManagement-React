import { useState, useEffect } from "react";
import useAuthorization from "../hooks/useAuthorization";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL} from '../apiConfig';
import {jwtDecode} from "jwt-decode";



const Login = () => {

        // Sets state for authenitication 
        const {setAuth} = useAuthorization();

         // Navigation to endpoints
         const navigate= useNavigate();

         // Allows user to navigate to a link once authorized
         const location= useLocation();
         const from = location.state?.from?.pathname || "/";

        // State for email and password 
        const[email, setEmail] = useState('');
        const[password, setPassword] = useState('');
        const[errMsg, setErrMsg] = useState('');

        // Clear error message when user enters input
        useEffect(() => {
        setErrMsg('');
        }, [email, password])

       

        // Actions to be performed when when logging in
        const handleLogin = async (e) => {
            e.preventDefault();
            console.log(email, password)
            setEmail('');
            setPassword('');
            

            try {
                // const response = await axios.post(`${API_BASE_URL}account/login`, {email:email, password:password})
                // // .then((response) => {
                // //    console.log(response.data)
                // // //     //navigate('/home');
                // // })
                // console.log(JSON.stringify(response?.data));
                // const token = JSON.stringify(response?.data?.token);
                // const decoded = jwtDecode(token);
                // console.log(decoded);
                // const tokenRoles = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
                // console.log(tokenRoles);
                // setAuth({email, password, token, tokenRoles});
                // navigate(from, {replace:true});
                // console.log(token);
                const response = await axios.post(`${API_BASE_URL}account/login`, { email, password });
                const token = response.data.token;
                const decoded = jwtDecode(token);
                const tokenRoles = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
                setAuth({ email, token, tokenRoles });
                navigate(from, { replace: true });
                console.log(token);
                
            } catch(error){
                if(!error?.response) {
                    setErrMsg('No response from server.');
                } else if (error.response?.status === 400) {
                    setErrMsg('Missing email or password.');
                } else if (error.response?.status === 401)
                {
                    setErrMsg('Unauthorized login attempt.')
                } else {
                    setErrMsg('Login Failed.')
                }
                console.log(error);
            }
        }
    
        return (
            <section>
                <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                <h1>User Login</h1>
                <form onSubmit={handleLogin}>
                    <label for="InputEmail" class="form-label mt-4">Email address</label>
                        <input required
                            type="email" 
                            class="form-control" 
                            id="InputEmail" 
                            autoFocus
                            aria-describedby="emailHelp" 
                            placeholder="Please enter email"
                            onChange= {(e) => setEmail(e.target.value)}
                            value={email}
                        />
                                        
                    <label for="InputPassword" class="form-label mt-4">Password</label>
                        <input required
                            type="password" 
                            class="form-control" 
                            id="InputPassword" 
                            placeholder="Enter password"
                            onChange= {(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    <button type="Login" class="btn btn-primary">
                    Login
                    </button>
                    <p>
                     Not Registered? <Link to ="/register">Register Here</Link>
                    </p>
                </form>
            </section>
        );
}

export default Login;