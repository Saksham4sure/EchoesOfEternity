import Landing from './pages/Landing';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, useCallback, useEffect } from "react";
import { useLenis } from 'lenis/react';
import BeforeLanding from './pages/BeforeLanding';
import Footer from './pages/Footer';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const horizon = useRef(null);
  const [preloading, setPreloading] = useState(true);

  const lenis = useLenis();

  // Stop Lenis while preloading
  useEffect(() => {
    if (!lenis) return;
    if (preloading) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [lenis, preloading]);

  const handlePreloadComplete = useCallback(() => {
    setPreloading(false);
    // Give layout a frame to settle, then refresh ScrollTrigger
    requestAnimationFrame(() => {
      ScrollTrigger.refresh(true);
    });
  }, []);

  useGSAP(() => {
    // Only setup horizontal scroll after preloader is done
    if (preloading) return;

    const elem = horizon.current;
    if (!elem) return;

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
  }, [preloading]);

  return (
    <>
      <Preloader onComplete={handlePreloadComplete} />
      {/* Gate site content: render but keep invisible until preloader is done */}
      <div
        style={{
          visibility: preloading ? 'hidden' : 'visible',
          opacity: preloading ? 0 : 1,
          transition: 'opacity 0.3s ease',
        }}
      >
        <CustomCursor />
        <BeforeLanding />
        <div ref={horizon} className='flex h-screen will-change-transform'>
          <Landing />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App