import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';
import { useNavigate } from 'react-router-dom';

const AddSupplierForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: ''
    });

    const navigate = useNavigate(); // Use navigate hook

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE_URL}Suppliers`, formData);
            // Redirect to the supplier page
            navigate('/supplier');
        } catch (error) {
            console.error('Error adding supplier:', error);
        }
    };

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <input type="text" 
                name="name" 
                placeholder="Name"
                autoComplete='off' 
                value={formData.name} 
                onChange={handleChange} />
                <input type="email" 
                name="email" 
                placeholder="Email" 
                autoComplete='off' 
                value={formData.email} 
                onChange={handleChange} />
                <input type="text" 
                name="address" 
                placeholder="Address" 
                autoComplete='off' 
                value={formData.address} 
                onChange={handleChange} />
                <button type="submit">Add Supplier</button>
            </form>
        </section>
    );
};

export default AddSupplierForm;
