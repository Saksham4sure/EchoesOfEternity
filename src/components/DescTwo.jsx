import React from 'react'
import SplitTextReveal from './SplitTextReveal'
import RevealOnScroll from './RevealOnScroll'

const DescTwo = ({ style }) => {
    return (
        <div className={style}>
            <div className='h-full'>
                <RevealOnScroll type="slideRight" delay={0.2} className='h-full flex items-center justify-start w-10'>
                    <h1>Hall I</h1>
                </RevealOnScroll>
            </div>
            <div className='flex flex-col pl-15 mt-15'>
                <SplitTextReveal as="h1" splitType="chars" stagger={0.06} className='text-7xl md:text-9xl libre'>
                    THE SACRED TEMPLE
                </SplitTextReveal>
                <RevealOnScroll type="fadeUp" delay={0.8} className='mt-4'>
                    <p className='text-xl italic'>Silence is the language spoken by sacred places.</p>
                </RevealOnScroll>
            </div>
            <RevealOnScroll type="fadeUp" delay={1.0} className='absolute bottom-20 right-10'>
                <p className='text-sm w-80 md:w-110 text-right'>Nestled among mist-covered hills, the temple served as a spiritual center for generations. Pilgrims traveled from distant lands seeking wisdom, guidance, and blessings from the ancient priests who once inhabited its halls.</p>
            </RevealOnScroll>
        </div>
    )
}

export default DescTwo