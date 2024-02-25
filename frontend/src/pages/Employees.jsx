import React, { useEffect, useState } from 'react';
import CardEmployee from "../components/CardEmployee";
import { getEmployees, updateEmployees, updateResetAllEmployees } from "../api/api.routes.employees";
import { updateResetAllCustomers } from "../api/api.routes.customers";
import { Botton } from '../components/Botton';
import { useAlert } from 'react-alert';

function Employees() {
    const [employeesData, setEmployeesData] = useState(null);
    const [clickEmployee, setClickEmployee] = useState(null);

    const alert = useAlert();

    useEffect(() => {
        getEmployees().then(data => setEmployeesData(data));
    }, [])

    const handleClickEmployee = async (employeeName, employeeWorkplace, employeeAvailable) => {
        let data;
        if (employeeAvailable === "no") {
            data = {
                "name": employeeName,
                "workplace": employeeWorkplace,
                "available": "yes"
            }

            setClickEmployee(data);
        } else {
            data = {
                "name": employeeName,
                "workplace": employeeWorkplace,
                "available": "no"
            }

            setClickEmployee(data);
        }

        // call update employees function 
        try {
            const res = await updateEmployees(employeeName, data);
            if (res.ok) {
                const updatedEmployees = await getEmployees();
                setEmployeesData(updatedEmployees);
            } else {
                console.error('Error updating employee:', res.statusText);
            }
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    const handleReset = async () => {
        try {
            const resCustomer = await updateResetAllCustomers();
            const resEmployee = await updateResetAllEmployees();
            if (resCustomer.ok && resEmployee.ok) {
                alert.success('Successfully reset');
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        } catch (error) {
            console.error('Error when run updateResetAllCustomers:', error);
        }
    }

    return (
        <div >
            <CardEmployee
                employeesData={employeesData}
                handleClickEmployee={handleClickEmployee}
            />

            <Botton
                className='absolute bottom-4 right-7 text-sm text-white'
                onClick={handleReset}
            >
                Reset
            </Botton>

        </div>
    )
}

export default Employees;