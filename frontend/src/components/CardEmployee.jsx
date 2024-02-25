import React from 'react';

function CardEmployee({ employeesData, handleClickEmployee }) {
    return (
        <main className='absolute flex flex-col w-full items-center mt-28'>
            <div className='flex justify-center text-white text-6xl font-bold w-2/4'>
                Arrive register
            </div>
            <div className='flex flex-col justify-center items-center mt-8 h-[calc(70vh-110px)] w-[50%]'>
                {employeesData ? (
                    <table  className="table-auto border-collapse w-full">
                        <thead>
                            <tr className="bg-gray-800 text-white text-3xl">
                                <th className="py-2 px-4">Name</th>
                                <th className="py-2 px-4">Workplace</th>
                                <th className="py-2 px-4">Available</th>
                            </tr>
                        </thead>
                        <tbody className='text-white text-xl text-center'>
                            {employeesData.map((employee) => (
                                <tr key={employee._id} className="border-b border-gray-300">
                                    <td className="py-2 px-4">{employee.name}</td>
                                    <td className="py-2 px-4">{employee.workplace}</td>
                                    <td
                                        className="py-2 px-4"
                                    >
                                        <button
                                            className='bg-red-600/75 w-16 rounded-lg text-lg hover:border-2'
                                            onClick={() => handleClickEmployee(employee.name, employee.workplace, employee.available)}
                                        >
                                            {employee.available}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Loading employee data...</p>
                )}
            </div>
        </main>
    );
}

export default CardEmployee;
