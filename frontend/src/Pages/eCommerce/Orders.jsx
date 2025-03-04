import React from 'react'
import Sidebar from '../../components/Sidebar'
import Receipts from '../../assets/MenuBarOptions/receipt.svg'
import OrdersTable from '../../components/eCommerce/OrdersTable'

const Orders = () => {

    const Link = [
        {
            id: 1,
            name: "Orders",
            logo: Receipts,
            link: "/ecommerce/orders",
            selected: true
        }
    ]

    return (
        <div className='flex w-screen'>
            <Sidebar selected='eCommerce' option={Link}/>
            <OrdersTable />
        </div>
    )
}

export default Orders