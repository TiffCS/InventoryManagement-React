import React from 'react';

const OrderTable = ({ orders, handleEdit, handleDelete }) => {
  return (
    <div class="table-responsive">
      <table class="table table-bordered">
          <thead>
              <tr>
              <th scope='col'>ID</th>
              <th scope ='col'>Order Quantity</th>
              <th scope = 'col'>Order Cost£</th>
              <th scope = 'col'>Employee ID</th>
              <th scope = 'col'>Stock ID</th>
              <th scope = 'col'>Date</th>
              <th scope = 'col'>Action</th>
              </tr>
          </thead>
          <tbody>
              {orders.map((order) => (
              <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.orderQuantity}</td>
              <td>{order.orderCost}</td>
              <td>{order.employeeId}</td>
              <td>{order.stockId}</td>
              <td>{order.date}</td>
              <td>
              <button onClick={() => handleEdit(order.id)}>Edit</button>
              <button onClick={() => handleDelete(order.id)}>Delete</button>
              </td>
              </tr>
              ))}   
          </tbody>
      </table>
    </div>
  );
};

export default OrderTable;