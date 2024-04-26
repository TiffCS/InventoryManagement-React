import React from 'react';

const StockDetails = ({ stock }) => {
  if (!stock) {
    return <div>No stock selected.</div>;
  }

  return (
    <div>
        <h2>Stock Details</h2>
        <p>ID: {stock.id}</p>
        <p>Quantity Available: {stock.quantityAvailable}</p>
        <p>Reorder Quantity: {stock.reorderQuantity}</p>
    </div>
  );
};

export default StockDetails;