import React from 'react'
import Receipts from '../../assets/MenuBarOptions/receipt.svg'
import Sidebar from '../../components/Sidebar'
import CustomerTable from '../../components/Teams/CustomerTable'

const Customer = () => {
    const Links = [
        {
          id: 1,
          name: "Vendor",
          logo: Receipts,
          link: "/teams/vendor",
          selected: false
        },
        {
            id: 2,
            name: "Customer",
            logo: Receipts,
            link: "/teams/customer",
            selected: true
        }
    ]

    return (
        <div className='flex w-screen'>
            <Sidebar selected="Teams" option={Links}/>
            <CustomerTable />
        </div>
    )
}

export default Customer