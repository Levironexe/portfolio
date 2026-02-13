import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div
      className='bg-neutral-200 flex flex-col items-center justify-center
        transition-all duration-1000 ease-out
        w-full min-h-screen text-[#0a0a0a] selection:bg-red-600 selection:text-white px-6 md:px-8 lg:px-10 relative'
    >      Page under maintenance. <Link href="/" className='ml-2 underline'>Return home</Link>
    </div>
  )
}

export default page
