import React from 'react';

const ProductTable = ({ products, handleEdit, handleDelete }) => {
  return (
    <div class="table-responsive">
      <table class="table table-bordered">
          <thead>
              <tr>
              <th scope='col'>ID</th>
              <th scope ='col'>Name</th>
              <th scope = 'col'>Email</th>
              <th scope = 'col'>Actions</th>
              </tr>
          </thead>
          <tbody>
              {employees.map((employee) => (
              <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>
              <button onClick={() => handleEdit(employee.id)}>Edit</button>
              <button onClick={() => handleDelete(employee.id)}>Delete</button>
              </td>
              </tr>
              ))}   
          </tbody>
      </table>
    </div>
  );
};

export default EmployeesTable;