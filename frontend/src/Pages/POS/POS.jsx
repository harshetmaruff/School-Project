import React from 'react'
import { useParams } from 'react-router'
import Numpad from '../../components/POS/Numpad';

const POS = () => {
    const { cid } = useParams();

    return (
        <div className='flex flex-col h-screen'>
            <nav className='bg-darkviolette text-bwhite p-2 font-bold text-2xl'>
                POS {cid}
            </nav>
            <div className='flex w-screen h-full'>
                <div className='border-r-8 border-r-darkviolette border-solid flex flex-col justify-between'>
                    Hi 
                    <Numpad />
                </div>
                <div>Bye</div>
            </div>
        </div>
    )
}
 
export default POS