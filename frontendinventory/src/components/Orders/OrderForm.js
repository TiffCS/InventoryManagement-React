import React from 'react';

const OrderForm = ({ order, handleInputChange, handleSubmit, handleCancel }) => {
  return (
    <div className="add-item-form">
        <h2>Order Form</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Order Quantity:
            <input type="text" 
              required
              name="orderQuantity" 
              autoComplete='off'
              value={order.orderQuantity} 
              onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Order Cost£:
            <input type="text" 
              required
              name="orderCost" 
              autoComplete='off'
              value={order.orderCost} 
              onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Employee ID:
            <input type="text" 
              required
              name="employeeId" 
              autoComplete='off'
              value={order.employeeId} 
              onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Stock ID:
            <input type="text" 
              required
              name="stockId" 
              autoComplete='off'
              value={order.stockId} 
              onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Date:
            <input type="date" 
              required
              name="date" 
              autoComplete='off'
              value={order.date} 
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

export default OrderForm;
