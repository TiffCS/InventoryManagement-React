// EditForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';

const EditForm = ({ supplier, onUpdate, onCancel }) => {
    const [formData, setFormData] = useState({
        id: supplier.id,
        name: supplier.name,
        email: supplier.email,
        address: supplier.address
        // Add more fields as needed
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send updated supplier details to the server
            await axios.put(`${API_BASE_URL}Suppliers/${supplier.id}`, formData);
            // Call onUpdate function to trigger parent component update
            onUpdate(formData);
            // Reset edit mode and clear selected supplier
            onCancel();
        } catch (error) {
            console.error('Error updating supplier details:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            <input type="text" name="address" value={formData.address} onChange={handleChange} />
            {/* Add more input fields for other supplier details */}
            <button type="submit">Update</button>
        </form>
    );
};

export default EditForm;
