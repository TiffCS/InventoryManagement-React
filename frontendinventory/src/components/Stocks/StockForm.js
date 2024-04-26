import React from 'react';

const StockForm = ({ stock, handleInputChange, handleSubmit, handleCancel }) => {
  return (
    <div className="add-item-form">
        <h2>Stock Form</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Quantity Available:
            <input type="text" 
              name="quantityAvailable" 
              autoComplete='off'
              value={stock.quantityAvailable} 
              onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Reorder Quantity:
            <input type="text" 
              name="reorderQuantity" 
              autoComplete='off'
              value={stock.reorderQuantity} 
              onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Product ID:
            <input type="text" 
              name="productId" 
              autoComplete='off'
              value={stock.productId} 
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

export default StockForm;
