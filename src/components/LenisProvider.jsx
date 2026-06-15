import { useEffect, useRef } from 'react';
import { ReactLenis } from 'lenis/react'; 
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// IMPORTANT: Do not skip this import! It includes critical styles 
// that prevent layout jumping on mobile mobile address bars.
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis 
      root 
      ref={lenisRef} 
      options={{ 
        lerp: 0.1,
        duration: 1.2,
        
        // --- MOBILE SMOOTHING ACTIVATED HERE ---
        syncTouch: true,       // Mimics desktop momentum scrolling on touch screens
        syncTouchLerp: 0.075,   // Easing intensity specifically for mobile touch
        touchMultiplier: 1.2   // Makes mobile scrolling feel slightly more responsive
      }}
    >
      {children}
    </ReactLenis>
  );
}