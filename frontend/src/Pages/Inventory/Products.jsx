import React from 'react'
import Receipts from '../../assets/MenuBarOptions/receipt.svg'
import Sidebar from '../../components/Sidebar'
import ProductSide from '../../components/Inventory/ProductSide'

const Products = () => {

    const Link = [
        {
            id: 1,
            name: "Products",
            logo: Receipts,
            link: "/inventory/products",
            selected: true
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
            selected: false
        },
        { id: 4, name: "Transfer", logo: Receipts, link: "/inventory/transfer", selected: false },
    ]

    return (
        <div className='flex w-screen'>
            <Sidebar selected='Inventory' option={Link} />
            <ProductSide />
        </div>
    )
}

export default Products