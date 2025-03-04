import React from 'react'
import Receipts from '../../assets/MenuBarOptions/receipt.svg'
import Sidebar from '../../components/Sidebar'
import InvoiceTable from '../../components/Sales/InvoiceTable'

const Invoice = () => {

    const Link = [
        {
            id: 1,
            name: "Invoice",
            logo: Receipts,
            link: "/sales/invoice",
            selected: true
        }
    ]
    
    return (
        <div className='flex w-screen'>
            <Sidebar selected='Sales' option={Link}/>
            <InvoiceTable />
        </div>
    )
}

export default Invoice