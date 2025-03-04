import React from 'react'

const BankTable = () => {
  return (
    <div className='flex-1 ml-4'>
        <div className='flex flex-row justify-between mt-4'>
            <h2 className='text-darkviolette font-bold text-2xl '>Bank</h2>
            <button className='font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white'>Create</button>
        </div>
        <div className='mt-6 m-4'>
            <table className='w-full  table-auto'>
                <thead>
                    <tr className='border-b-4 border-darkviolette'>
                        <th className='text-left p-1'>Account No</th>
                        <th className='text-left p-1'>Bank</th>
                        <th className='text-left p-1'>Bank Identifier Code</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='bg-bwhite'>
                        <td className='p-2'>BE5009467</td>
                        <td className='p-2'>State Bank of India</td>
                        <td className='p-2'>SBININBBXX</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default BankTable