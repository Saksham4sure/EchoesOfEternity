import home1 from '../assets/images/home1.jpg';
import home2 from '../assets/images/home2.jpg';
import home3 from '../assets/images/home3.jpg';
import home4 from '../assets/images/home4.jpg';
import home5 from '../assets/images/home5.jpg';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const BeforeLanding = () => {
  const container = useRef(null); 
  const img1 = useRef(null);
  const img2 = useRef(null);
  const img3 = useRef(null);
  const img4 = useRef(null);
  const img5 = useRef(null);

  useGSAP(() => {
    // Each image gets its own parallax speed + subtle secondary motion
    const parallaxItems = [
      { ref: img1, yPercent: 40,  scale: 1.05, opacity: 0.4 },
      { ref: img2, yPercent: -50, scale: 1.08, opacity: 1 },
      { ref: img3, yPercent: -35, scale: 1.06, opacity: 1 },
      { ref: img4, yPercent: -80, scale: 1.04, opacity: 1 },
      { ref: img5, yPercent: -60, scale: 1.07, opacity: 0.85 },
    ];

    parallaxItems.forEach(({ ref, yPercent, scale, opacity }) => {
      gsap.fromTo(ref.current,
        { yPercent: 0, scale: 1 },
        {
          yPercent,
          scale,
          opacity,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            scrub: 1.2,
            start: "top bottom",
            end: "bottom top",
          }
        }
      );
    });
  }, { scope: container }); 

  return (
    <div ref={container} className='bg-black'>
      <div className='flex flex-col md:flex-row md:items-end py-10 gap-5 md:gap-10 px-4 md:pl-28'>
        <h1 className='text-8xl text-[#eeeeee] md:w-90 libre'><span className='italic'>Echoes</span> of Eternity</h1>
        <p className='md:text-xl pb-5 text-[#aaaaaa]'>Journey Through Civilizations Lost to Time</p>
      </div>
      <div className='h-[210vh] md:h-[200vh] relative'>
        <div ref={img1} className='h-90 w-60 md:h-120 md:w-90 scale-70 absolute left-1/2 -translate-x-1/2 top-[15%] md:top-0 opacity-70'><img className='h-full w-full object-cover' src={home1} alt="Eternity 1" /></div>
        <div ref={img2} className='h-90 w-60 md:h-120 md:w-90 absolute left-[6%] md:left-[10%] top-0 md:top-[10%] z-10'><img className='h-full w-full object-cover' src={home2} alt="Eternity 2" /></div>
        <div ref={img3} className='h-90 w-60 md:h-120 md:w-90 absolute right-[2%] md:right-[10%] top-[38%] md:top-[16%] z-10'><img className='h-full w-full object-cover' src={home3} alt="Eternity 3" /></div>
        <div ref={img4} className='h-90 w-60 md:h-120 md:w-90 absolute right-[34%] md:right-[20%] top-[60%] md:top-[58%] scale-95 z-10'><img className='h-full w-full object-cover' src={home4} alt="Eternity 4" /></div>
        <div ref={img5} className='h-90 w-60 md:h-120 md:w-90 absolute left-[34%] md:left-[16%] bottom-[0%] scale-90'><img className='h-full w-full object-cover' src={home5} alt="Eternity 5" /></div>
      </div>
    </div>
  )
}

export default BeforeLanding;