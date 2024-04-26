import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';
import { useNavigate } from 'react-router-dom';
import useAuthorization from "../../hooks/useAuthorization";

const AddSupplierForm = () => {
    const { auth } = useAuthorization();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: ''
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Use navigate hook

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Check if the supplier with the same name already exists
            const response = await axios.get(`${API_BASE_URL}Suppliers?name=${formData.name}`);
            if (response.data.length > 0) {
                setError("Supplier with this name already exists.");
            } else {
                // If supplier doesn't exist, proceed to add
                await axios.post(`${API_BASE_URL}Suppliers`, formData, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });
                // Redirect to the supplier page
                navigate('/supplier');
            }
        } catch (error) {
            console.error('Error adding supplier:', error);
        }
    };

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    required
                    name="name"
                    placeholder="Name"
                    autoComplete='off'
                    value={formData.name}
                    onChange={handleChange} />
                <input type="email"
                    required
                    name="email"
                    placeholder="Email"
                    autoComplete='off'
                    value={formData.email}
                    onChange={handleChange} />
                <input type="text"
                    required
                    name="address"
                    placeholder="Address"
                    autoComplete='off'
                    value={formData.address}
                    onChange={handleChange} />
                <button type="submit">Add Supplier</button>
                {error && <p className="text-danger">{error}</p>}
            </form>
        </section>
    );
};

export default AddSupplierForm;
