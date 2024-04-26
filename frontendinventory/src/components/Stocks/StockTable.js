import React from 'react';

const StocksTable = ({ stocks, handleEdit, handleDelete }) => {
  return (
    <div class="table-responsive">
      <table class="table table-bordered">
          <thead>
              <tr>
              <th scope='col'>ID</th>
              <th scope ='col'>Units Available</th>
              <th scope = 'col'>Reorder Quantity</th>
              <th scope = 'col'>Product ID</th>
              <th scope = 'col'>Actions</th>
              </tr>
          </thead>
          <tbody>
              {stocks.map((stock) => (
              <tr key={stock.id}>
              <td>{stock.id}</td>
              <td>{stock.quantityAvailable}</td>
              <td>{stock.reorderQuantity}</td>
              <td>{stock.productId}</td>
              <td>
              <button onClick={() => handleEdit(stock.id)}>Edit</button>
              <button onClick={() => handleDelete(stock.id)}>Delete</button>
              </td>
              </tr>
              ))}   
          </tbody>
      </table>
    </div>
  );
};

export default StocksTable;