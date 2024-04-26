import React from 'react';

const ProductForm = ({ product, handleInputChange, handleSubmit, handleCancel }) => {
  return (
    <div className="add-item-form">
        <h2>Product Form</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Category:
            <input type="text" 
              name="category" 
              autoComplete='off'
              value={product.category} 
              onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Brand:
            <input type="text" 
              name="brand" 
              autoComplete='off'
              value={product.brand} 
              onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Name:
            <input type="text" 
              name="name" 
              autoComplete='off'
              value={product.name} 
              onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Size:
            <input type="text" 
              name="size" 
              autoComplete='off'
              value={product.size} 
              onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Cost£:
            <input type="text" 
              name="cost" 
              autoComplete='off'
              value={product.cost} 
              onChange={handleInputChange} />
          </label>
          <br />
          <label>
            SupplierID:
            <input type="text" 
              name="supplier" 
              autoComplete='off'
              value={product.supplierId} 
              onChange={handleInputChange} />
          </label>
          <br />
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
    </div>
  );
};

export default ProductForm;
