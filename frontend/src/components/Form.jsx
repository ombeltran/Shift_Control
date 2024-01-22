import React, {useContext} from 'react';
import { useForm } from "react-hook-form";
import { CustomContext } from "../context/CustomProvider";


export function Form({ employeesData }) {
    const { setCustomer, customer } = useContext(CustomContext);

    const {
        register,
        handleSubmit,
        reset,
    } = useForm()

    const onSubmit = (data) => {
        setCustomer([...customer, data]);
        reset();
    }

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
