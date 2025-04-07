import React from 'react'
import Receipts from '../../assets/MenuBarOptions/receipt.svg'
import Sidebar from '../../components/Sidebar'
import WarehouseTable from '../../components/Inventory/WarehouseTable'

const Warehouse = () => {

    const Link = [
        {
            id: 1,
            name: "Products",
            logo: Receipts,
            link: "/inventory/products",
            selected: false
        },
        {
            id: 2,
            name: "Product Category",
            logo: Receipts,
            link: "/inventory/product_category",
            selected: false
        },
        {
            id: 3,
            name: "Warehouse",
            logo: Receipts,
            link: "/inventory/warehouse",
            selected: true
        },
        {
            id: 4,
            name: "Delivery",
            logo: Receipts,
            link: "/inventory/delivery",
            selected: false
        }
    ]

    return (
        <div className='flex w-screen'>
            <Sidebar selected='Inventory' option={Link} />
            <WarehouseTable />
        </div>
    ) 
}

export default Warehouse