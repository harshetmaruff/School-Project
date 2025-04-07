import React from 'react'
import Receipts from '../../assets/MenuBarOptions/receipt.svg'
import Sidebar from '../../components/Sidebar'
import EmployeeTable from '../../components/Teams/EmployeeTable'

const Employee = () => {
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
            selected: false
        },
        {
            id: 3,
            name: "Employee",
            logo: Receipts,
            link: "/teams/employee",
            selected: true
        }
    ]

    return (
        <div className='flex w-screen'>
            <Sidebar selected="Teams" option={Links}/>
            <EmployeeTable />
        </div>
    )
}

export default Employee