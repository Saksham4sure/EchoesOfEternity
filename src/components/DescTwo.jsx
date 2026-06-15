import React from 'react'

const DescTwo = ({ style }) => {
    return (
        <div className={style}>
            <div className='h-full'>
                <h1 className='h-full flex items-center justify-start w-10'>Hall I</h1>
            </div>
            <div className='flex flex-col pl-15 mt-15'>
                <h1 className='text-7xl md:text-9xl libre'>THE SACRED TEMPLE</h1>
                <p className='text-xl italic'>Silence is the language spoken by sacred places.</p>
            </div>
            <p className='absolute bottom-20 text-sm right-10 w-80 md:w-110 text-right'>Nestled among mist-covered hills, the temple served as a spiritual center for generations. Pilgrims traveled from distant lands seeking wisdom, guidance, and blessings from the ancient priests who once inhabited its halls.</p>
        </div>
    )
}

export default DescTwo