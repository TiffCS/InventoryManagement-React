import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';
import ProductDetails from './ProductDetails';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import useAuthorization from '../../hooks/useAuthorization';
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const {auth} = useAuthorization();
    // console.log("auth.token:", auth.token);

    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch students data when component mounts
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}Products`);
            setProducts(response.data);
            setSelectedProduct(null);
            setEditingProduct(null);
        } catch (error) {
        console.error('Error fetching products:', error);
        }
    };

    const handleEdit = (id) => {
    console.log('Edit button clicked for id:', id);
    const selected = products.find((product) => product.id === id);
    console.log('Selected product:', selected);
    setSelectedProduct(null);
    setEditingProduct({ id: selected.id, category: selected.category, brand: selected.brand, name: selected.name,
    size: selected.size, unitCost: selected.unitCost, supplierId: selected.supplierId});
    };



    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}Products/${id}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    // const handleViewDetails = (id) => {
    //     const selected = employees.find((employee) => employee.id === id);
    //     setSelectedEmployee(selected);
    //     setEditingEmployee(null);
    // };

    const handleAddProduct = () => {
        setSelectedProduct(null);
        setEditingProduct({ category: '', brand: '', name: '', size: '', unitCost: '', supplierId: '' });
    };

    const handleCancelEdit = () => {
        setEditingProduct(null);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Editing Product', editingProduct);

            if (editingProduct) {
            if (editingProduct.id) {
                console.log('Updating existing product:', editingProduct);
                await axios.put(`${API_BASE_URL}Products/${editingProduct.id}`, editingProduct, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });
            } else {
                // Remove the existing id property for new students
                const { id, ...newProduct } = editingProduct;
                console.log('Creating new product:', newProduct);
                await axios.post(`${API_BASE_URL}Products`, newProduct, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });
            }
            fetchProducts();
            }
        
        

        } catch (error) {
            console.error('Error saving product:', error);
            console.error('Response data:', error.response?.data);
        } finally {
            setEditingProduct(null);
        }
    };

  return (
    <div className="employee-manangement">
        <div className = "employee-form">
            <button onClick={() => navigate('/users')} className="back-button">Back to Users</button>
            <ProductList products={products} handleEdit={handleEdit} handleDelete={handleDelete} />
            {selectedProduct && <ProductDetails product={selectedProduct} />}
            {editingProduct && (
                <ProductForm
                product={editingProduct}
                handleInputChange={(e) => setEditingProduct({ ...editingProduct, [e.target.name]: e.target.value })}
                handleSubmit={handleFormSubmit}
                handleCancel={handleCancelEdit}
                />
            )}
        </div>
        <div className="create-employee-button">
            <button onClick={handleAddProduct}>Create New Product</button>
        </div>
    </div>
    
  );
};


export default Products;