import React from 'react'

const ReceiptTable = () => {
  return (
    <div className='flex-1 ml-4'>
        <div className='flex flex-row justify-between mt-4'>
            <h2 className='text-darkviolette font-bold text-2xl '>Cash / Bank Receipt</h2>
            <button className='font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white'>Create</button>
        </div>
        <div className='mt-6 m-4'>
            <table className='w-full  table-auto'>
                <thead>
                    <tr className='border-b-4 border-darkviolette'>
                        <th className='text-left p-1'>Number</th>
                        <th className='text-left p-1'>Customer</th>
                        <th className='text-left p-1'>Invoice Date</th>
                        <th className='text-left p-1'>Total in Currency</th>
                        <th className='text-left p-1'>Total</th>
                        <th className='text-left p-1'>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='bg-bwhite'>
                        <td className='p-2'>SJ/47/89</td>
                        <td className='p-2'>J Thompson</td>
                        <td className='p-2'>19/01/2025</td>
                        <td className='p-2'>₹ 91.00</td>
                        <td className='p-2'>91.00</td>
                        <td className='p-2'>Done</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ReceiptTable