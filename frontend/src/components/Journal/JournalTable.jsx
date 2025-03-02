import React from 'react'

const JournalTable = () => {
  return (
    <div className='flex-1 ml-4'>
        <div className='flex flex-row justify-between mt-4'>
            <h2 className='text-darkviolette font-bold text-2xl '>Journal Entries</h2>
            <button className='font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white'>Create</button>
        </div>
        <div className='mt-6 m-4'>
            <table className='w-full  table-auto'>
                <thead>
                    <tr className='border-b-4 border-darkviolette'>
                        {/* <th></th> */}
                        <th className='text-left p-1'>Date</th>
                        <th className='text-left p-1'>Number</th>
                        <th className='text-left p-1'>Partner</th>
                        <th className='text-left p-1'>Type</th>
                        <th className='text-left p-1'>Reference</th>
                        <th className='text-left p-1'>Total</th>
                        <th className='text-left p-1'>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='bg-bwhite'>
                        {/* <td></td> */}
                        <td className='p-2'>18/01/2025</td>
                        <td className='p-2'>khkhk0</td>
                        <td className='p-2'>J Thompson</td>
                        <td className='p-2'>JV-122</td>
                        <td className='p-2'>fddfd</td>
                        <td className='p-2'>91.00</td>
                        <td className='p-2'>Done</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default JournalTable