import { useState, useEffect, useContext } from "react";
import AuthContext from "../authContext/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { API_BASE_URL } from '../apiConfig';


const Login = () => {

        // Sets state for authenitication 
        const {setAuth} = useContext(AuthContext);

        // State for email and password 
        const[email, setEmail] = useState('');
        const[password, setPassword] = useState('');
        const[errMsg, setErrMsg] = useState('');

        // Clear error message when user enters input
        useEffect(() => {
        setErrMsg('');
        }, [email, password])

        // Navigation to endpoints
        const navigate=useNavigate()

        // Actions to be performed when when logging in
        const handleLogin = async (e) => {
            e.preventDefault();
            console.log(email, password)
            setEmail('');
            setPassword('');
            

            try {
                const response = await axios.post(`${API_BASE_URL}account/login`, {email:email, password:password})
                // .then((response) => {
                //    console.log(response.data)
                // //     //navigate('/home');
                // })
                console.log(JSON.stringify(response?.data));
                const token = JSON.stringify(response?.data?.token);
                //console.log(token);
                setAuth({email, password, token});
                navigate('/home');
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