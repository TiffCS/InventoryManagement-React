import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';
import OrderDetails from './OrderDetails';
import OrderForm from './OrderForm';
import OrderList from './OrderList';
import useAuthorization from '../../hooks/useAuthorization';


const Orders = () => {
    const {auth} = useAuthorization();
    // console.log("auth.token:", auth.token);

    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [editingOrder, setEditingOrder] = useState(null);

    useEffect(() => {
        // Fetch students data when component mounts
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}Orders`);
            setOrders(response.data);
            setSelectedOrder(null);
            setEditingOrder(null);
        } catch (error) {
        console.error('Error fetching orders:', error);
        }
    };

    const handleEdit = (id) => {
    console.log('Edit button clicked for id:', id);
    const selected = orders.find((order) => order.id === id);
    console.log('Selected order:', selected);
    setSelectedOrder(null);
    setEditingOrder({ id: selected.id, orderQuantity: selected.orderQuantity, orderCost: selected.orderCost, employeeId: selected.employeeId, stockId: selected.stockId, date: selected.date})
    };



    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}Orders/${id}`, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            })
            fetchOrders();
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    // const handleViewDetails = (id) => {
    //     const selected = employees.find((employee) => employee.id === id);
    //     setSelectedEmployee(selected);
    //     setEditingEmployee(null);
    // };

    const handleAddOrder = () => {
        setSelectedOrder(null);
        setEditingOrder({ orderQuantity: '', orderCost: '', employeeId: '', stockId: '', date: ''});
    };

    const handleCancelEdit = () => {
        setEditingOrder(null);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Editing Order', editingOrder);

            if (editingOrder) {
            if (editingOrder.id) {
                console.log('Updating existing order:', editingOrder);
                await axios.put(`${API_BASE_URL}Orders/${editingOrder.id}`, editingOrder)/* {
                    headers: {
                        'Authorization': `Bearer ${auth.token}`
                    }
                })*/
            } else {
                // Remove the existing id property for new students
                const { id, ...newOrder } = editingOrder;
                console.log('Creating new product:', newOrder);
                await axios.post(`${API_BASE_URL}Orders`, newOrder) /* {
                        headers: {
                            'Authorization': `Bearer ${auth.token}`
                        }
                })*/
            }
            fetchOrders();
            }
        
        

        } catch (error) {
            console.error('Error saving orders:', error);
            console.error('Response data:', error.response?.data);
        } finally {
            setEditingOrder(null);
        }
    };

  return (
    <div className="employee-manangement">
        <div className = "employee-form">
            <OrderList orders={orders} handleEdit={handleEdit} handleDelete={handleDelete} />
            {selectedOrder && <OrderDetails order={selectedOrder} />}
            {editingOrder && (
                <OrderForm
                order={editingOrder}
                handleInputChange={(e) => setEditingOrder({ ...editingOrder, [e.target.name]: e.target.value })}
                handleSubmit={handleFormSubmit}
                handleCancel={handleCancelEdit}
                />
            )}
        </div>
        <div className="create-employee-button">
            <button onClick={handleAddOrder}>Create New Order</button>
        </div>
    </div>
    
  );
};


export default Orders;