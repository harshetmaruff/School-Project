import React from 'react'

const Numpad = () => {
  return (
    <div className='grid grid-cols-4 bg-lightviolette p-2'>
        <button className='p-2 text-2xl bg-white m-1 rounded-lg'>Print</button>
        <button className='p-2 text-2xl bg-white m-1 rounded-lg'>1</button>
        <button className='p-2 text-2xl bg-white m-1 rounded-lg'>2</button>
        <button className='p-2 text-2xl bg-white m-1 rounded-lg'>3</button>
        <button className='p-2 text-2xl bg-white m-1 rounded-lg'>Void</button>
        <button className='p-2 text-2xl bg-white m-1 rounded-lg'>4</button>
        <button className='p-2 text-2xl bg-white m-1 rounded-lg'>5</button>
        <button className='p-2 text-2xl bg-white m-1 rounded-lg'>6</button>
        <button className='p-2 text-2xl bg-white m-1 rounded-lg'>QTY</button>
        <button className='p-2 text-2xl bg-white m-1 rounded-lg'>7</button>
        <button className='p-2 text-2xl bg-white m-1 rounded-lg'>8</button>
        <button className='p-2 text-2xl bg-white m-1 rounded-lg'>9</button>
        <button className='p-2 text-2xl bg-white m-1 rounded-lg'>Exit</button>
        <div></div>
        <button className='p-2 text-2xl bg-white m-1 rounded-lg'>0</button>
        <button className='p-2 text-2xl bg-white m-1 rounded-lg'>.</button>
    </div>
  )
}

export default Numpad