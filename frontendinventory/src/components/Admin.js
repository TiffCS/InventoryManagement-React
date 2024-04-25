import employeeLogo from "./logos/employeeLogo.jpeg";
import usersLogo from "./logos/usersLogo.jpeg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../apiConfig";

const Admin = () => {

    const navigate = useNavigate()

    const handleLogout = async(e) => {
        e.preventDefault();
        await axios.post(`${API_BASE_URL}account/logout`)
        navigate('/');
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light navbar-container" data-bs-theme="light">
                <div className="container-fluid"> 
                    <span className="navbar-brand mb-0 h1">Admin Home</span>
                    <button onClick={handleLogout} className="btn btn-danger">Logout</button>
                </div>
            </nav>
            <div className="card-wrapper">
                <div className="card-container">
                    <img src={employeeLogo} alt="employee logo" className="card-img" />
                    <h1 className="card-title">Employees</h1>
                    <p className="card-description">
                        View, edit and delete employees.
                    </p>
                    <button onClick={() => navigate("/employee")}className="card-btn">Click Here</button>
                </div> 
                <div className="card-container">
                    <img src={usersLogo} alt="users logo" className="card-img" />
                    <h1 className="card-title">Users</h1>
                    <p className="card-description">
                        Access to inventory system.
                    </p>
                    <button onClick={() => navigate("/users")}className="card-btn">Click Here</button>
                </div>
            </div>
        </div>
    );    
}

export default Admin;