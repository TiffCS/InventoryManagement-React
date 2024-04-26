import logo from './logo.svg';
import './App.css';
import RequireAuth from './components/RequireAuth';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Registration';
import Login from './components/Login';
import Home from './components/Home';
import Admin from './components/Admin';
import Users from './components/Users';
import AppLayout from './components/AppLayout';
import Unauthorized from './components/Unauthorized';
import Employees from './components/Employees/Employee';
import Products from './components/Products/Product';
import Stocks from './components/Stocks/Stock';
import Orders from './components/Orders/Order';
import Suppliers from './components/Suppliers/Supplier';
import SupplierDetails from './components/Suppliers/SupplierDetails';
import AddSupplierForm from './components/Suppliers/AddSupplierForm';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<AppLayout />}>
            <Route path="register" element={<Register/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="unauthorized" element={<Unauthorized/>}/>

          {/* protected routes*/}
            <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
              <Route path="admin" element={<Admin/>}/>
              <Route path="employee" element={<Employees/>}/>
            </Route>
            <Route element={<RequireAuth allowedRoles={["Purchasing", "Inventory", "Admin"]} />}>
              <Route path="users" element={<Users/>}/>
              <Route path="product" element={<Products/>}/>
              <Route path="stock" element={<Stocks/>}/>
              <Route path="order" element={<Orders/>}/>
              <Route path="supplier" element={<Suppliers/>}/>
              <Route path="/supplier/:id" element={<SupplierDetails />} />
              <Route path = "/supplier/add" element = {<AddSupplierForm/>}/>
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

