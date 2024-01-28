import React, { useEffect, useState } from 'react';
import CardEmployee from "../components/CardEmployee";
// import { CustomContext } from "../context/CustomProvider";
import { IoMdReturnLeft } from "react-icons/io";
import { Link } from "react-router-dom";
import { getEmployees, updateEmployees } from "../api/api.routes.employees";
// import { getCustomers, createCustomers } from "../api/api.routes.customers";

function Employees() {
    const [employeesData, setEmployeesData] = useState(null);
    const [clickEmployee, setClickEmployee] = useState(null);
    // const { setTurn, turn } = useContext(CustomContext);

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