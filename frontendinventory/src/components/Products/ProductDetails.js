import React from 'react';

const ProductDetails = ({ product }) => {
  if (!product) {
    return <div>No product selected.</div>;
  }

  return (
    <div>
        <h2>Product Details</h2>
        <p>ID: {product.id}</p>
        <p>Category: {product.category}</p>
        <p>Brand: {product.brand}</p>
        <p>Name: {product.name}</p>
        <p>Size: {product.size}</p>
        <p>Cost: {product.unitCost}</p>
        <p>Supplier ID: {product.supplierId}</p>
    </div>
  );
};

export default ProductDetails;