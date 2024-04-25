import React from 'react';
import EmployeesTable from './EmployeeTable';

const EmployeeList = ({ employees, handleEdit, handleDelete }) => {
  return (
    <div>
      <h2>Employees List </h2>
      <EmployeesTable employees={employees} handleEdit={handleEdit} handleDelete={handleDelete} />
    </div>
  );
};

export default EmployeeList;