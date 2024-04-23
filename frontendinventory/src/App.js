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
            </Route>
            <Route element={<RequireAuth allowedRoles={["Admin","Purchasing","Inventory"]} />}>
              <Route path="users" element={<Users/>}/>
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
