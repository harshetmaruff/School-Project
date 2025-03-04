import React from 'react'
import Sidebar from '../../components/Sidebar'
import Receipts from '../../assets/MenuBarOptions/receipt.svg'
import PurchaseOrderTable from '../../components/Purchase/PurchaseOrderTable'

const PurchaseOrder = () => {

    const Link = [
        {
            id: 1,
            name: "Purchase Order",
            logo: Receipts,
            link: "/purchase/purchase_order",
            selected: true
        }
    ]

    return (
        <div className='flex w-screen'>
            <Sidebar selected='Purchase' option={Link}/>
            <PurchaseOrderTable /> 
        </div>
    )
}

export default PurchaseOrder