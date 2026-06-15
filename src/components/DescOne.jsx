import React from 'react'

const DescOne = ({ style }) => {
    return (
        <div className={style}>
            <div className='h-full'>
                <h1 className='h-full flex items-center justify-start w-10'>Hall I</h1>
            </div>
            <div className='relative'>
                <div className='flex flex-col mt-[30vh] md:mt-25'>
                    <h1 className='text-7xl md:text-9xl libre text-[#222222]'>THE LOST DYNASTY</h1>
                    <p className='text-base md:text-xl text-[#555555] pl-10 italic'>- Empires are not remembered by their power, but by what they leave behind.</p>
                </div>
                <p className='text-sm leading-5 w-80 md:w-100 absolute bottom-15 md:bottom-10 text-[#333333]'>For nearly four centuries, the dynasty flourished between mountains and rivers, building monuments that challenged the limits of their age. Though their empire vanished long ago, traces of their ambition remain carved into stone and preserved through relics that continue to fascinate historians today.</p>
            </div>
        </div>
    )
}

export default DescOne