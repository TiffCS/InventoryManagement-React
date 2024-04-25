import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../apiConfig";
import inventoryLogo from "./logos/inventoryLogo.jpeg";
import ordersLogo from "./logos/ordersLogo.jpeg";
import productsLogo from "./logos/productsLogo.jpeg";
import suppliersLogo from "./logos/suppliersLogo.jpeg";

const Users = () => {

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
                    <span className="navbar-brand mb-0 h1">User Home</span>
                    <button onClick={handleLogout} className="btn btn-danger">Logout</button>
                </div>
            </nav>
            <div className="card-wrapper">
                <div className="card-container">
                    <img src={productsLogo} alt="product logo" className="card-img" />
                    <h1 className="card-title">Products</h1>
                    <p className="card-description">
                        This section is for all products within the system.
                    </p>
                    <button onClick={() => navigate("/")}className="card-btn">Click Here</button>
                </div> 
                <div className="card-container">
                    <img src={inventoryLogo} alt="inventory logo" className="card-img" />
                    <h1 className="card-title">Inventory</h1>
                    <p className="card-description">
                        This section is for the stock of products currently in the system.
                    </p>
                    <button onClick={() => navigate("/")}className="card-btn">Click Here</button>
                </div>
                <div className="card-container">
                    <img src={ordersLogo} alt="orders logo" className="card-img" />
                    <h1 className="card-title">Orders</h1>
                    <p className="card-description">
                        This section is for all orders for inventory.
                    </p>
                    <button onClick={() => navigate("/")}className="card-btn">Click Here</button>
                </div>
                <div className="card-container">
                    <img src={suppliersLogo} alt="suppliers logo" className="card-img" />
                    <h1 className="card-title">Suppliers</h1>
                    <p className="card-description">
                        This section is for all suppliers in the system.
                    </p>
                    <button onClick={() => navigate("/")}className="card-btn">Click Here</button>
                </div>
            </div>
        </div>
    );    
}
export default Users;