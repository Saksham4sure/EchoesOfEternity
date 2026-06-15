import Landing from './pages/Landing';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import BeforeLanding from './pages/BeforeLanding';

const App = () => {
  const horizon = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    const elem = horizon.current;

    gsap.to(elem, {
      x: () => -(elem.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: elem,
        start: "top top",
        end: () => "+=" + (elem.scrollWidth - window.innerWidth),
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
      }
    });
  }, []);

  return (
    <>
      <BeforeLanding />
      <div ref={horizon} className='flex h-screen'>
        <Landing />
      </div>
    </>
  )
}

export default App