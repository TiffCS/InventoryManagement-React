import React from 'react';
import ProductTable from './ProductTable';

const ProductList = ({ products, handleEdit, handleDelete }) => {
  return (
    <div>
      <h2>Products List </h2>
      <ProductTable products={products} handleEdit={handleEdit} handleDelete={handleDelete} />
    </div>
  );
};

export default ProductList;