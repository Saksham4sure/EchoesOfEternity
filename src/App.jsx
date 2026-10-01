import Landing from './pages/Landing';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, useCallback } from "react";
import BeforeLanding from './pages/BeforeLanding';
import Footer from './pages/Footer';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const horizon = useRef(null);
  const [preloading, setPreloading] = useState(true);

  const handlePreloadComplete = useCallback(() => {
    setPreloading(false);
  }, []);

  useGSAP(() => {
    const elem = horizon.current;

    gsap.to(elem, {
      x: () => -(elem.scrollWidth - window.innerWidth),
      ease: "none",
      force3D: true,
      scrollTrigger: {
        trigger: elem,
        start: "top top",
        end: () => "+=" + (elem.scrollWidth - window.innerWidth),
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        fastScrollEnd: true,
      }
    });
  }, []);

  return (
    <>
      <Preloader onComplete={handlePreloadComplete} />
      <CustomCursor />
      <BeforeLanding />
      <div ref={horizon} className='flex h-screen will-change-transform'>
        <Landing />
      </div>
      <Footer />
    </>
  )
}

export default App