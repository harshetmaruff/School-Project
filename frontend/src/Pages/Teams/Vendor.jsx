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
        },
        {
            id: 2,
            name: "Customer",
            logo: Receipts,
            link: "/teams/customer",
            selected: false
        },
        {
            id: 3,
            name: "Employee",
            logo: Receipts,
            link: "/teams/employee",
            selected: false
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