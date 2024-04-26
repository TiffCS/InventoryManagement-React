import React from 'react';
import OrderTable from './OrderTable';

const OrderList = ({ orders, handleEdit, handleDelete }) => {
  return (
    <div>
      <h2>Orders List </h2>
      <OrderTable orders={orders} handleEdit={handleEdit} handleDelete={handleDelete} />
    </div>
  );
};

export default OrderList;