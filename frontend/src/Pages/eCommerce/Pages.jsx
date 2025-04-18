import React from 'react'
import Sidebar from '../../components/Sidebar'
import Receipts from '../../assets/MenuBarOptions/receipt.svg'
import PagesTable from '../../components/eCommerce/PagesTable'

const Pages = () => {

    const Link = [
        {
            id: 1,
            name: "Pages",
            logo: Receipts,
            link: "/ecommerce/pages",
            selected: true
        },
        {
            id: 2,
            name: "Business Details",
            logo: Receipts,
            link: "/ecommerce/details",
            selected: false
        }
    ]

    return (
        <div className='flex w-screen'>
            <Sidebar selected='eCommerce' option={Link}/>
            <PagesTable/>
        </div>
    )
}

export default Pages