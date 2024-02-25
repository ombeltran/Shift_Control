import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Card } from '../components/Card';
import { getEmployees } from "../api/api.routes.employees";
import { getCustomersName, updateCustomers } from "../api/api.routes.customers";

function NextCustomer() {
    const [availableEmployees, setAvailableEmployees] = useState([]);
    const [quequePeople, setQuequePeople] = useState([]);

    const {
        register,
    } = useForm()

    const onSubmit = async (data) => {
        if (data.worker !== "") {
            const customers = await getCustomersName(data.worker, 'no');
            setQuequePeople(customers);
        } else {
            const customers = [];
            setQuequePeople(customers);
        }
    }

    const handleNext = async (turn, workplace, customerName, name) => {
        const customers = await getCustomersName(name, 'no');
        const filterCustomers = customers.filter(elemento => elemento.servedId > 0);
        const numberCustomers = filterCustomers.length;

        const dataCustomer = {
            name,
            customerName,
            workplace,
            turn,
            available: 'no',
            served: 'yes',
            servedId: numberCustomers + 1
        }
        await updateCustomers(name, turn, dataCustomer)
        const newQuequePeople = await getCustomersName(name, 'no');
        setQuequePeople(newQuequePeople);
    }

    const handleSelectChange = (e) => {
        const selectedWorker = e.target.value;
        onSubmit({ worker: selectedWorker });
    }

    const fetchData = async () => {
        const employees = await getEmployees();
        setAvailableEmployees(employees);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='absolute flex justify-center items-center text-white w-full mt-28'>
            <Card className='flex flex-col h-auto min-h-48 w-[370px] pt-4 pb-6 px-6'>
                <form
                    className='flex flex-col border-b-2 pb-4 w-full'
                >
                    <label
                        htmlFor="worker"
                        className='text-2xl text-white font-bold mb-2'
                    >
                        Employee
                    </label>
                    <select
                        name="worker"
                        id="worker"
                        className='w-56 p-1 border-2 rounded-lg text-black mb-4'
                        {...register('worker', { required: true })}
                        required
                        onChange={handleSelectChange}
                    >
                        <option value=""></option>
                        {availableEmployees && availableEmployees.map(({ _id, name, available }) => (
                            available === 'yes' && (<option key={_id} value={name}>
                                {name}
                            </option>)
                        ))}
                    </select>
                </form>

                <div className='flex flex-col w-full'>
                    {quequePeople.map(({ _id, turn, workplace, customerName, name, served }) => (
                        served === 'no' && (
                            <div
                                key={_id}
                                className='flex justify-center items-center text-xl w-80'
                            >
                                <div className='flex text-xl w-64 py-3 gap-3'>
                                    <p>{workplace}{turn}</p>
                                    <p>{customerName}</p>
                                </div>
                                <button
                                    className='bg-red-600/75 px-3 rounded-lg'
                                    onClick={() => handleNext(turn, workplace, customerName, name)}
                                >
                                    Attend
                                </button>
                            </div>
                        )
                    ))}
                </div>
            </Card>
        </div>
    )
}

export default NextCustomer;
