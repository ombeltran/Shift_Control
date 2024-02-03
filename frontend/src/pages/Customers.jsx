import React, { useEffect, useState, useContext } from 'react';
// import { CustomContext } from "../context/CustomProvider";
import { getEmployees } from "../api/api.routes.employees";
import { IoMdReturnLeft } from "react-icons/io";
import { Link } from "react-router-dom";
import { Card } from "../components/Card";
import { Form } from "../components/Form";


function Customers() {
    const [employeesData, setEmployeesData] = useState(null);
    // const { customer, setCustomer } = useContext(CustomContext);

    useEffect(() => {
        getEmployees().then(data => setEmployeesData(data));
    }, [])

    return (
        <div className='flex w-full h-screen'>
            <div className='flex flex-col items-center w-full h-screen'>
                <h1 className='text-5xl text-white font-bold m-10'>
                    Separate your turn
                </h1>
                <Card className='h-[390px] w-80 md:w-72' >
                    <Form employeesData={employeesData} />
                </Card>
            </div>
            <Link to="/" >
                <IoMdReturnLeft
                    className='absolute bottom-4 right-4 text-5xl text-white'
                />
            </Link>
        </div>
    )
}

export default Customers;
