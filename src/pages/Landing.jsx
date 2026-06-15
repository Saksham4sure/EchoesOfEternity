import React from 'react'
import ImageOne from '../components/ImageOne'
import DescOne from '../components/DescOne'
import ImageTwo from '../components/ImageTwo'
import DescTwo from '../components/DescTwo'

const Landing = () => {
    return (
        <>
            <div className='bg-[#eeeeee] shrink-0 w-[80vw] h-screen flex flex-col md:flex-row border border-zinc-300 text-[#222222] relative'>
                <h1 className='text-xs md:w-[15%] py-2 flex items-center justify-center tracking-wider'>Navigate</h1>
                <div className='h-full flex flex-col justify-center md:h-auto md:w-[85%] relative px-3'>
                    <p className='text-2xl md:absolute top-[35%] left-[10%]'> <span className='text-5xl libre'>Renaissance</span> -And the stories continue.</p>
                    <p className='text-sm md:absolute top-[43%] left-[40%]'>Relics • Manuscripts • Artifacts</p>
                    <p className='mt-8 md:mt-0 md:w-90 lg:w-110 text-xs md:text-base md:leading-5 md:absolute top-[50%] left-[30%]'>Welcome to a collection of forgotten worlds, sacred relics, and stories preserved beyond the reach of time. Within these halls rest fragments of civilizations that shaped history through art, architecture, knowledge, and belief.</p>
                    <p className='text-xs mt-4 md:mt-0 md:absolute bottom-[10%] md:left-1/2 md:-translate-x-1/2'>The past is never truly gone. It waits patiently to be discovered.</p>
                </div>
                <p className='text-[10px] absolute bottom-2 right-2'>Scroll to discover</p>
            </div>

            <ImageOne style="shrink-0 relative w-300 bg-[#eeeeee] " />
            <DescOne style="shrink-0 relative px-10 flex h-screen gap-20 w-160 md:w-220 bg-[#eeeeee] " />

            <ImageTwo style="shrink-0 relative w-270 bg-black flex" />
            <DescTwo style="shrink-0 relative w-140 md:w-270 bg-black flex text-white px-10" />
        </>
    )
}

export default Landing