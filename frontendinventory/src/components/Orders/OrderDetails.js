import React from 'react';

const OrderDetails = ({ order }) => {
  if (!order) {
    return <div>No order selected.</div>;
  }

  return (
    <div>
        <h2>Order Details</h2>
        <p>ID: {order.id}</p>
        <p>Order Quantity: {order.orderQuantity}</p>
        <p>Order Cost: {order.orderCost}</p>
        <p>Employee ID: {order.employeeId}</p>
        <p>Stock ID: {order.stockId}</p>
        <p>Date: {order.date}</p>
    </div>
  );
};

export default OrderDetails;