import React, { useContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { CustomContext } from "../context/CustomProvider";
import { getCustomers } from "../api/api.routes.customers";

export function Form({ employeesData }) {
    const { setCustomer, customer } = useContext(CustomContext);
    const [selectedBarber, setSelectedBarber] = useState('');
    const [dataCustomer, setDataCustomer] = useState([]);

    const {
        register,
        handleSubmit,
        reset,
    } = useForm()

    const fetchDataCustomer = async () => {
        try {
            const data = await getCustomers();
            setDataCustomer(data);
        } catch (error) {
            console.error('Error fetching customer data:', error);
        }
    };

    useEffect(() => {
        fetchDataCustomer();
    }, []);

    const onSubmit = (data) => {
        setCustomer([...customer, data]);
        console.log(customer);
        reset();
    }

    const handleChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedBarber(selectedValue);
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
                Barber
            </label>
            <select
                className='w-56 p-1 border-2 rounded-lg text-black mb-4'
                name="worker"
                id="worker"
                {...register('worker', { required: true })}
                required
                onChange={handleChange}
            >
                <option value="">Select a barber:</option>
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
                {
                    dataCustomer.map(({ worker, workplace, turn }, index) => (
                        worker === selectedBarber ? (
                            <option key={index} value={`${workplace}${turn}`}>
                                {workplace}{turn}
                            </option>
                        ) : null
                    ))
                }
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
