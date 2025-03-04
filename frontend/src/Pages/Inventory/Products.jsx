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
            name: "Goods Receipt",
            logo: Receipts,
            link: "/inventory/goods_receipt",
            selected: false
        }
    ]

    return (
        <div className='flex w-screen'>
            <Sidebar selected='Inventory' option={Link} />
            <ProductSide />
        </div>
    )
}

export default Products