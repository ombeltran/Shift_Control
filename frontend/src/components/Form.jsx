import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import {
    getCustomersName,
    getCustomersNameTurn,
    updateCustomers
} from "../api/api.routes.customers";
import { useAlert } from 'react-alert';


export function Form({ employeesData }) {
    const [selectedBarber, setSelectedBarber] = useState([]);
    const alert = useAlert();

    const {
        register,
        handleSubmit,
        reset,
    } = useForm()

    const onSubmit = async (data) => {
        const customer = await getCustomersNameTurn(data.worker, Number(data.turns));
        const newCustomer = {
            name: customer[0].name,
            customerName: data.customerName,
            workplace: customer[0].workplace,
            turn: customer[0].turn,
            available: 'no'
        }
        await updateCustomers(data.worker, Number(data.turns), newCustomer);
        alert.success('Shift successfully assigned!');
        reset();
    }

    const handleChange = async (e) => {
        const selectedValue = e.target.value.trim();
        const turnBarber = await getCustomersName(selectedValue, 'yes');
        setSelectedBarber(turnBarber);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col'
        >
            <label
                htmlFor="worker"
                className='text-2xl text-white font-bold mb-2'
            >
                Employee
            </label>
            <select
                className='w-56 p-1 border-2 rounded-lg text-black mb-4'
                name="worker"
                id="worker"
                {...register('worker', { required: true })}
                required
                onChange={handleChange}
            >
                <option value="">Select a employee:</option>
                {
                    employeesData && employeesData.filter(({ available }) => available === "yes")
                        .map(({ name }) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))
                }
            </select>

            <label
                htmlFor="turns"
                className='text-2xl text-white font-bold mb-2'
            >
                Available turns
            </label>
            <select
                className='w-56 p-1 border-2 rounded-lg text-black mb-4'
                name="turns"
                id="turns"
                {...register('turns', { required: true })}
                required
            >
                <option value="">Select a turn:</option>
                {selectedBarber && selectedBarber.map(({ _id, turn, workplace }) => (
                    <option key={_id} value={turn}>
                        {workplace}{turn}
                    </option>
                ))}
            </select>

            <label
                htmlFor='customerName'
                className='text-2xl text-white font-bold mb-2'
            >
                Customer name
            </label>

            <input
                type="text"
                name='customerName'
                className='w-56 p-1 border-2 rounded-lg text-black mb-8'
                {...register('customerName', { required: true })}
                required
            />

            <button
                className=' flex justify-center items-center bg-red-700 py-2 px-6 rounded-full
                font-bold hover:scale-105 border-2 cursor-pointer w-32 h-10'
            >
                Reserve
            </button>
        </form>
    )
}
