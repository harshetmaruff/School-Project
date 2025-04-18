import React from 'react'
import Sidebar from '../../components/Sidebar'
import Receipts from "../../assets/MenuBarOptions/receipt.svg"
import AvailableCounters from '../../components/POS/AvailableCounters'

const Counters = () => {

    const Link = [
        {
            id: 1,
            name: "Counters",
            logo: Receipts,
            link: "/pos/counters",
            selected: true
        },
        {
            id: 2,
            name: "Sessions",
            logo: Receipts,
            link: "/pos/shop_session",
            selected: false
        }
    ]

    return (
      <div className='flex w-screen'>
          <Sidebar selected='POS' option={Link}/>
          <AvailableCounters />
      </div>
    )
}

export default Counters