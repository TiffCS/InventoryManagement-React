import React from 'react';

const ProductTable = ({ products, handleEdit, handleDelete }) => {
  return (
    <div class="table-responsive">
      <table class="table table-bordered">
          <thead>
              <tr>
              <th scope='col'>ID</th>
              <th scope ='col'>Category</th>
              <th scope = 'col'>Brand</th>
              <th scope = 'col'>Name</th>
              <th scope = 'col'>Size</th>
              <th scope = 'col'>Cost£</th>
              <th scope = 'col'>Supplier ID</th>
              <th scope = 'col'>Actions</th>
              </tr>
          </thead>
          <tbody>
              {products.map((product) => (
              <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>{product.name}</td>
              <td>{product.size}</td>
              <td>{product.unitCost}</td>
              <td>{product.supplierId}</td>
              <td>
              <button onClick={() => handleEdit(product.id)}>Edit</button>
              <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
              </tr>
              ))}   
          </tbody>
      </table>
    </div>
  );
};

export default ProductTable;