import React from 'react';

const EmployeeDetails = ({ employee }) => {
  if (!employee) {
    return <div>No employee selected.</div>;
  }

  return (
    <div>
      <h2>Employee Details</h2>
      <p>ID: {employee.id}</p>
      <p>Name: {employee.name}</p>
      <p>Email: {employee.email}</p>
    </div>
  );
};

export default EmployeeDetails;