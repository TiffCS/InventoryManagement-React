import React from 'react';

const EmployeeForm = ({ employee, handleInputChange, handleSubmit, handleCancel }) => {
  return (
    <div className="add-item-form">
        <h2>Employee Form</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" 
              name="name" 
              autoComplete='off'
              value={employee.name} 
              onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Email:
            <input type="email" 
              name="email" 
              autoComplete='off'
              value={employee.email} 
              onChange={handleInputChange} />
          </label>
          <br />
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
    </div>
  );
};

export default EmployeeForm;