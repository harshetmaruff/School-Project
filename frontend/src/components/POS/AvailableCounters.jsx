import React from 'react'

const AvailableCounters = () => {
  return (
    <div className='ml-4 mt-4 w-100'>
        <div className='p-4 ring-2 ring-gray-300 rounded-lg'>
            <h2 className='text-darkviolette font-bold text-xl '>Shop</h2>
            <button className='font-bold text-base mt-6 p-2 px-4 bg-darkviolette text-white'>Continue Selling</button>

            <div className='mt-10'>
                <p>Last Closing Balance: </p>
                <p>Last Closing Date: </p>
            </div>
        </div>
    </div>
  )
}

export default AvailableCounters