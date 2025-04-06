import React from 'react'
import Receipts from '../../assets/MenuBarOptions/receipt.svg'
import Sidebar from '../../components/Sidebar'
import VendorTable from '../../components/Teams/VendorTable'

const Vendor = () => {
    const Links = [
        {
          id: 1,
          name: "Vendor",
          logo: Receipts,
          link: "/teams/vendor",
          selected: true
        }
    ]

    return (
        <div className='flex w-screen'>
            <Sidebar selected="Teams" option={Links}/>
            <VendorTable />
        </div>
    )
}

export default Vendor