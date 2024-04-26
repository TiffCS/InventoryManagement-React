import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';
import StockDetails from './StockDetails';
import StockForm from './StockForm';
import StockList from './StockList';
import useAuthorization from '../../hooks/useAuthorization';


const Stocks = () => {
    const {auth} = useAuthorization();
    // console.log("auth.token:", auth.token);

    const [stocks, setStocks] = useState([]);
    const [selectedStock, setSelectedStock] = useState(null);
    const [editingStock, setEditingStock] = useState(null);

    useEffect(() => {
        // Fetch students data when component mounts
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
    setEditingStock({ id: selected.id, quantityAvailable: selected.quantityAvailable, reorderQuantity: selected.reorderQuantity, productId: selected.productId})
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

    // const handleViewDetails = (id) => {
    //     const selected = employees.find((employee) => employee.id === id);
    //     setSelectedEmployee(selected);
    //     setEditingEmployee(null);
    // };

    const handleAddStock = () => {
        setSelectedStock(null);
        setEditingStock({ quantityAvailable: '', reorderQuantity: '', productId: ''});
    };

    const handleCancelEdit = () => {
        setEditingStock(null);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Editing Stock', editingStock);

            if (editingStock) {
            if (editingStock.id) {
                console.log('Updating existing stock:', editingStock);
                await axios.put(`${API_BASE_URL}Stocks/${editingStock.id}`, editingStock)/* {
                    headers: {
                        'Authorization': `Bearer ${auth.token}`
                    }
                })*/
            } else {
                // Remove the existing id property for new students
                const { id, ...newStock } = editingStock;
                console.log('Creating new product:', newStock);
                await axios.post(`${API_BASE_URL}Stocks`, newStock) /* {
                        headers: {
                            'Authorization': `Bearer ${auth.token}`
                        }
                })*/
            }
            fetchStocks();
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
        <div className = "employee-form">
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