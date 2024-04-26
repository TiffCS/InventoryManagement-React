import React from 'react';
import StocksTable from './StockTable';

const StockList = ({ stocks, handleEdit, handleDelete }) => {
  return (
    <div>
      <h2>Stocks List </h2>
      <StocksTable stocks={stocks} handleEdit={handleEdit} handleDelete={handleDelete} />
    </div>
  );
};

export default StockList;