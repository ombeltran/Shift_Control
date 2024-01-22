import React from 'react'

function CardEmployee({ employeesData, handleClickEmployee }) {
  return (
    <main className='flex flex-col items-center py-8'>
            <div className='flex justify-center text-white text-6xl font-bold w-2/4'>
                Arrive register
            </div>
            <div className='flex justify-center items-center flex-wrap gap-2 mt-6 h-[calc(70vh-110px)] w-[50%]'>
                {employeesData ? (
                    employeesData.map(employee => (
                        <div
                            key={employee.id}
                            className='flex justify-around py-3 px-4 h-auto w-[80%]
                            text-white gap-2 bg-gradient-to-b from-transparent/70 to-black 
                            border-2 rounded-2xl mb-3 cursor-pointer'
                            onClick={() => handleClickEmployee(employee.name, employee.workplace, employee.available)}
                        >
                            <p><span className='font-bold text-xl'>Name:</span> {employee.name}</p>
                            <p><span className='font-bold text-xl'>Workplace:</span> {employee.workplace}</p>
                            <p><span className='font-bold text-xl'>Available:</span> {employee.available}</p>
                        </div>
                    ))
                ) : (
                    <p>Loading employee data...</p>
                )}
            </div>
        </main>
  )
}

export default CardEmployee