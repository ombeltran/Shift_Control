import React, { useEffect, useState } from 'react';
import CardEmployee from "../components/CardEmployee";
import { IoMdReturnLeft } from "react-icons/io";
import { Link } from "react-router-dom";
import { getEmployees } from "../api/api.routes";

function Employees() {
    const [employeesData, setEmployeesData] = useState(null);
    const [clickEmployee, setClickEmployee] = useState(null);

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


        try {
            const response = await fetch(`http://localhost:3000/api/employees/${employeeName}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const updatedEmployees = await getEmployees();
                setEmployeesData(updatedEmployees);
            } else {
                console.error('Error updating employee:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    return (
        <div>
            <CardEmployee
                employeesData={employeesData}
                handleClickEmployee={handleClickEmployee}
            />
            <Link to="/" >
                <IoMdReturnLeft
                    className='absolute bottom-4 right-4 text-5xl text-white'
                />
            </Link>
        </div>
    )
}

export default Employees;