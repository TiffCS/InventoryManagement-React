import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';
import supplierLogo from '../logos/supplierLogo.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import EditForm from './EditForm';
import useAuthorization from "../../hooks/useAuthorization";

const Suppliers = () => {
    const { auth } = useAuthorization();
    const [data, setData] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const navigate = useNavigate(); // Using useNavigate hook

    useEffect(() => {
        fetchSuppliers();  
    }, []);

    const fetchSuppliers = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}Suppliers`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching suppliers:', error);
        }
    };

    const handleEditClick = (supplier) => {
        setEditMode(true);
        setSelectedSupplier(supplier); // Update selectedSupplier state with the new supplier
    };    

    const handleUpdate = (updatedData) => {
        setData(data.map(supplier => (supplier.id === selectedSupplier.id ? updatedData : supplier)));
        setEditMode(false);
    };

    const handleCancelEdit = () => {
        setEditMode(false);
        setSelectedSupplier(null); // Clear selectedSupplier state
    };

    const handleAddSupplierClick = () => {
        navigate('/supplier/add');  // Use navigate function to navigate to the specified route
    };

    const handleGoToUsers = () => {
        navigate('/users');  // Navigate to the users section
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}Suppliers/${id}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            setData(data.filter(supplier => supplier.id !== id)); // Remove the deleted supplier from the data state
        } catch (error) {
            console.error('Error deleting supplier:', error);
        }
    };


    return (
        <div className="mt-3 text-center">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <button className="btn btn-dark btn-square" onClick={handleGoToUsers}>User Page</button>
                <button className="btn btn-dark btn-square" onClick={handleAddSupplierClick}>Add Supplier</button>
            </div>
            <div className="row g-2 bg-primary bg-opacity-10 rounded-2">
                {data.length > 0 && data.map((item, index) => (
                    <div key={index} className="col-sm-6 col-lg-4">
                        <div className="bg-white rounded-3 border shadow-sm h-100 overflow-hidden cursor-move">
                            <div className='d-flex flex-column'>
                                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                                    <div className="container">
                                        <button className="btn btn-outline-primary me-2" onClick={() => handleEditClick(item)}>Edit Supplier</button>
                                        <button className="btn btn-outline-primary me-2" onClick={() => handleDelete(item.id)}>Delete Supplier</button>
                                    </div>
                                </nav>
                                <div className="container">
                                    <h2 className='d-md-block text-center'>SUPPLIER</h2>
                                    <img className='prop-card-img hover-zoom' src={supplierLogo} alt={item.name} /> 
                                    <div className="d-flex flex-column p-2">
                                        <Link to={`/supplier/${item.id}`} className="fw-semibold text-center text-black">{item.name}</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {editMode && selectedSupplier && (
                    <EditForm key={selectedSupplier.id} supplier={selectedSupplier} onUpdate={handleUpdate} onCancel={handleCancelEdit} />
                )}
            </div>
        </div>
    );
};

export default Suppliers;
