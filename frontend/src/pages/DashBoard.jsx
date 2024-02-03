import React, { useEffect, useState } from 'react';
import { getEmployees } from "../api/api.routes.employees";
import { getCustomers } from "../api/api.routes.customers";
import { Card } from "../components/Card";

function DashBoard() {
    const [availableEmployees, setAvailableEmployees] = useState([]);
    const [availableTurns, setAvailableTurns] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const employees = await getEmployees();
            setAvailableEmployees(employees);
            const turn = await getCustomers();
            setAvailableTurns(turn);
        };

        fetchData();

    }, []);

    return (
        <div className='flex justify-center items-center text-white h-screen w-full'>
            <Card className='flex flex-col h-auto w-auto p-10 '>
                <div className='flex w-full text-4xl font-bold gap-10'>
                    <h2>Worker</h2>
                    <h2>Turn</h2>
                    <h2>Customer</h2>
                </div>
                {availableEmployees.map(({ _id, name, workplace, available }) => (
                    available === "yes" && (
                        <div
                            key={_id}
                            className='flex items-center text-2xl pb-2 gap-14 w-[650px] border-b-2'
                        >
                            <h1 className='min-w-28 max-w-28'>{name}</h1>
                            <div className='flex gap-14 items-center text-5xl font-bold'>
                                <div>
                                    {
                                        availableTurns
                                            .find((person) => person.name === name)?.customerName !== '' &&
                                        workplace
                                    }
                                    {
                                        availableTurns
                                            .find((person) => person.name === name)?.customerName !== '' &&
                                        availableTurns
                                            .find((person) => person.name === name)?.turn
                                    }
                                </div>
                                <div className='text-3xl font-normal w-60'>
                                    {
                                        availableTurns
                                            .find((person) => person.name === name)?.customerName
                                    }
                                </div>
                                <div className=' flex items-center'>
                                    {
                                        availableTurns
                                            .find((person) => person.name === name)?.customerName !== '' &&
                                        <button
                                            className='text-xl bg-red-700/40 rounded-lg px-3 py-1'
                                            onClick={() => console.log(availableTurns
                                                .find((person) => person.name === name)?._id)} // Aqui estoy capturando el ID
                                        >
                                            Next
                                        </button>
                                    }
                                </div>

                            </div>
                        </div>
                    )
                ))}
            </Card>
        </div>
    );
}

export default DashBoard;
