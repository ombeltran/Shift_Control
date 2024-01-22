import React, { useEffect, useState, useContext } from 'react';
import { CustomContext } from "../context/CustomProvider";
import { getEmployees } from "../api/api.routes";
import { IoMdReturnLeft } from "react-icons/io";
import { Link } from "react-router-dom";
import { Card } from "../components/Card";
import { Form } from "../components/Form";

function Customers() {
    const [employeesData, setEmployeesData] = useState(null);
    const { customer, setCustomer } = useContext(CustomContext);

    useEffect(() => {
        getEmployees().then(data => setEmployeesData(data));
    }, [])

    return (
        <div className='flex w-full h-screen'>
            <div className='flex flex-col items-center w-full h-screen'>
                <h1 className='text-5xl text-white font-bold m-10'>
                    Separate your turn
                </h1>
                <Card className='h-[300px] w-80 md:w-72' >
                    <Form employeesData={employeesData} />
                </Card>
            </div>
            <div className='flex flex-col items-center w-full h-screen bg-white/5'>
                <h1 className='text-5xl text-white font-bold m-10'>
                    Customer queue
                </h1>
                <Card className='flex flex-col justify-start min-h-[300px] h-auto w-96 md:w-72 
                px-2 py-6'>
                    {customer && customer.map(({ worker, customerName }, index) => (
                        <div key={index} className="w-full px-4 border-b-2">
                            <p><span className='font-bold'>Barber:</span> {worker}</p>
                            <p><span className='font-bold'>Customer:</span> {customerName}</p>
                        </div>
                    ))}
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
