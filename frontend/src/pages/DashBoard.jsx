import React, { useEffect, useState } from 'react';
import { getEmployees } from "../api/api.routes.employees";
import { getCustomers } from "../api/api.routes.customers";
import { Card } from "../components/Card";

function DashBoard() {
    const [availableEmployees, setAvailableEmployees] = useState([]);
    const [availableTurns, setAvailableTurns] = useState([]);

    const fetchData = async () => {
        const employees = await getEmployees();
        setAvailableEmployees(employees);
        const turn = await getCustomers();
        setAvailableTurns(turn);
    };

    useEffect(() => {
        fetchData();

        const intervalId = setInterval(() => {
            fetchData();
        }, 1500);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className='absolute flex justify-center items-center text-white w-full mt-28'>
            <Card className='flex flex-col h-auto w-auto p-10 '>
                <div className='flex w-full text-4xl font-bold gap-10'>
                    <h2>Worker</h2>
                    <h2>Turn</h2>
                    <h2>Customer</h2>
                </div>
                {availableEmployees.map(({ _id, name, available }) => (
                    available === 'yes' && (<div
                        key={_id}
                        className='flex items-center text-2xl pb-2 gap-14 w-[650px] border-b-2'
                    >
                        <h1 className='min-w-28 max-w-28'>{name}</h1>
                        <div className='flex gap-14 items-center text-5xl font-bold w-[500px]'>
                            <div>
                                {
                                    availableTurns
                                        .filter(client => client.name === name && client.servedId > 0)
                                        .reduce((maxClient, client) => (
                                            maxClient.servedId > client.servedId ? maxClient : client
                                        ), {})
                                        .workplace
                                }
                                {
                                    availableTurns
                                        .filter(client => client.name === name && client.servedId > 0)
                                        .reduce((maxClient, client) => (
                                            maxClient.servedId > client.servedId ? maxClient : client
                                        ), {})
                                        .turn
                                }
                            </div>
                            <div className='text-3xl font-normal w-60'>
                                {
                                    availableTurns
                                        .filter(client => client.name === name && client.servedId > 0)
                                        .reduce((maxClient, client) => (
                                            maxClient.servedId > client.servedId ? maxClient : client
                                        ), {})
                                        .customerName
                                }
                            </div>
                        </div>
                    </div>)
                ))}
            </Card>
        </div>
    );
}

export default DashBoard;
