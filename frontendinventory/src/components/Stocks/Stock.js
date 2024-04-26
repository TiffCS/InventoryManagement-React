import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';
import StockDetails from './StockDetails';
import StockForm from './StockForm';
import StockList from './StockList';
import useAuthorization from '../../hooks/useAuthorization';
import { useNavigate } from 'react-router-dom';

const Stocks = () => {
    const { auth } = useAuthorization();

    const [stocks, setStocks] = useState([]);
    const [selectedStock, setSelectedStock] = useState(null);
    const [editingStock, setEditingStock] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch stocks data when component mounts
        fetchStocks();
    }, []);

    const fetchStocks = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}Stocks`);
            setStocks(response.data);
            setSelectedStock(null);
            setEditingStock(null);
        } catch (error) {
            console.error('Error fetching stocks:', error);
        }
    };

    const handleEdit = (id) => {
        console.log('Edit button clicked for id:', id);
        const selected = stocks.find((stock) => stock.id === id);
        console.log('Selected stock:', selected);
        setSelectedStock(null);
        setEditingStock({ id: selected.id, quantityAvailable: selected.quantityAvailable, reorderQuantity: selected.reorderQuantity, productId: selected.productId });
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}Stocks/${id}`, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            })
            fetchStocks();
        } catch (error) {
            console.error('Error deleting stock:', error);
        }
    };

    const handleAddStock = async () => {
        try {
            if (editingStock && editingStock.productId) {
                // Check if the product ID already exists in the stock list
                const response = await axios.get(`${API_BASE_URL}Stocks?productId=${editingStock.productId}`);
                if (response.data.length > 0) {
                    console.error('A stock with the same product ID already exists.');
                    const errorMessage = 'A stock with the same product ID already exists.';
                    setErrorMessage(errorMessage);
                    return;
                }
            }
    
            // If the product ID doesn't already exist in the stock list, proceed to add
            const { id, ...newStock } = editingStock;
            console.log('Creating new product:', newStock);
            await axios.post(`${API_BASE_URL}Stocks`, newStock, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
    
            fetchStocks(); // Refresh the stocks data
        } catch (error) {
            console.error('Error adding stock:', error);
            console.error('Response data:', error.response?.data);
        } finally {
            setEditingStock(null);
        }
    };
    
    
    
    const handleCancelEdit = () => {
        setEditingStock(null);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Editing Stock', editingStock);

            if (editingStock) {
                // Check if the product ID already exists in the stock list
                const existingStock = stocks.find(stock => stock.productId === editingStock.productId);
                if (existingStock && (!editingStock.id || editingStock.id !== existingStock.id)) {
                    console.error('A stock with the same product ID already exists.');
                    // Display a message to the user indicating that a stock with the same product ID already exists
                    // You can use state to manage this message and render it in your component
                    return;
                }

                if (editingStock.id) {
                    console.log('Updating existing stock:', editingStock);
                    await axios.put(`${API_BASE_URL}Stocks/${editingStock.id}`, editingStock, {
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        }
                    });
                } else {
                    // Remove the existing id property for new stock
                    const { id, ...newStock } = editingStock;
                    console.log('Creating new product:', newStock);
                    const response = await axios.post(`${API_BASE_URL}Stocks`, newStock, {
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        }
                    });

                    // Add the newly created stock to the stocks array
                    setStocks(prevStocks => [...prevStocks, response.data]);
                }

                fetchStocks(); // Refresh the stocks data
            }

        } catch (error) {
            console.error('Error saving stock:', error);
            console.error('Response data:', error.response?.data);
        } finally {
            setEditingStock(null);
        }
    };

    return (
        <div className="employee-manangement">
            <div className="employee-form">
                <button onClick={() => navigate('/users')} className="back-button">Back to Users</button>
                <StockList stocks={stocks} handleEdit={handleEdit} handleDelete={handleDelete} />
                {selectedStock && <StockDetails stock={selectedStock} />}
                {editingStock && (
                    <StockForm
                        stock={editingStock}
                        handleInputChange={(e) => setEditingStock({ ...editingStock, [e.target.name]: e.target.value })}
                        handleSubmit={handleFormSubmit}
                        handleCancel={handleCancelEdit}
                    />
                )}
            </div>
            <div className="create-employee-button">
                <button onClick={handleAddStock}>Create New Stock</button>
            </div>
        </div>
    );
};

export default Stocks;

