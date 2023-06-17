import React from 'react'
import Image from 'next/image'

function Story({img, username}) {
  return (
    <div>
        <Image src={img} height={30} width={30} className='h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2 object-fill  cursor-pointer hover:scale-110 transition transform duration-200 ease-out ' />
        <p className='text-xs w-14 truncate text-center'>{username}</p>
    </div>
  )
}

export default Story