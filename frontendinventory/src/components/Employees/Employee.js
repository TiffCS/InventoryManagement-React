import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';
import EmployeeDetails from './EmployeeDetails';
import EmployeeList from './EmployeeList';
import EmployeeForm from './EmployeeForm';
import useAuthorization from '../../hooks/useAuthorization';

const Employees = () => {
    const {auth} = useAuthorization();
    // console.log("auth.token:", auth.token);

    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [editingEmployee, setEditingEmployee] = useState(null);

    useEffect(() => {
        // Fetch students data when component mounts
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}Employees`);
            setEmployees(response.data);
            setSelectedEmployee(null);
            setEditingEmployee(null);
        } catch (error) {
        console.error('Error fetching employees:', error);
        }
    };

    const handleEdit = (id) => {
    console.log('Edit button clicked for id:', id);
    const selected = employees.find((employee) => employee.id === id);
    console.log('Selected employee:', selected);
    setSelectedEmployee(null);
    setEditingEmployee({ id: selected.id, name: selected.name, email: selected.email });
    };



    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}Employees/${id}`, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            })
            fetchEmployees();
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    // const handleViewDetails = (id) => {
    //     const selected = employees.find((employee) => employee.id === id);
    //     setSelectedEmployee(selected);
    //     setEditingEmployee(null);
    // };

    const handleAddEmployee = () => {
        setSelectedEmployee(null);
        setEditingEmployee({ name: '', email: '' });
    };

    const handleCancelEdit = () => {
        setEditingEmployee(null);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Editing Employee:', editingEmployee);

            if (editingEmployee) {
            if (editingEmployee.id) {
                console.log('Updating existing employee:', editingEmployee);
                await axios.put(`${API_BASE_URL}Employees/${editingEmployee.id}`, editingEmployee)/* {
                    headers: {
                        'Authorization': `Bearer ${auth.token}`
                    }
                })*/
            } else {
                // Remove the existing id property for new students
                const { id, ...newEmployee } = editingEmployee;
                console.log('Creating new employee:', newEmployee);
                await axios.post(`${API_BASE_URL}Employees`, newEmployee) /* {
                        headers: {
                            'Authorization': `Bearer ${auth.token}`
                        }
                })*/
            }
            fetchEmployees();
            }
        
        

        } catch (error) {
            console.error('Error saving employee:', error);
            console.error('Response data:', error.response?.data);
        } finally {
            setEditingEmployee(null);
        }
    };

  return (
    <div className="employee-manangement">
        <div className = "employee-form">
            <EmployeeList employees={employees} handleEdit={handleEdit} handleDelete={handleDelete} />
            {selectedEmployee && <EmployeeDetails employee={selectedEmployee} />}
            {editingEmployee && (
                <EmployeeForm
                employee={editingEmployee}
                handleInputChange={(e) => setEditingEmployee({ ...editingEmployee, [e.target.name]: e.target.value })}
                handleSubmit={handleFormSubmit}
                handleCancel={handleCancelEdit}
                />
            )}
        </div>
        <div className="create-employee-button">
            <button onClick={handleAddEmployee}>Create New Employee</button>
        </div>
    </div>
    
  );
};


export default Employees;