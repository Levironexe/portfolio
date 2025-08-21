import React from 'react'

const MiddleCross = () => {
  return (
    <div className='fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50 bg-transparent pointer-events-none'>
        <div className='relative'>
          <div className='h-4 w-[1.2px] backdrop-invert '></div>
          <div className='w-4 h-[1.2px] backdrop-invert absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'></div>
        </div>
    </div>
  )
}

export default MiddleCross
