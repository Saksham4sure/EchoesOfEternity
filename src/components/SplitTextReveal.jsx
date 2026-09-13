import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(SplitText, CustomEase, ScrollTrigger);

const SplitTextReveal = ({ 
  children, 
  as: Component = 'div', 
  className = '', 
  trigger, 
  delay = 0, 
  stagger = 0.05, 
  duration = 1.2,
  splitType = 'lines' 
}) => {
  const containerRef = useRef(null);
  
  useGSAP(() => {
    // Create the custom ease if it doesn't exist yet
    if (!CustomEase.get('textReveal')) {
      CustomEase.create('textReveal', 'M0,0 C0.22,0.61 0.36,1 1,1');
    }

    if (!containerRef.current) return;

    const splitTypeStr = splitType === 'lines' ? 'lines' : `${splitType},lines`;

    const split = new SplitText(containerRef.current, { 
      type: splitTypeStr,
      linesClass: 'overflow-hidden'
    });

    const targets = splitType === 'chars' ? split.chars : splitType === 'words' ? split.words : split.lines;

    // Use intersection observer instead of scrollTrigger if we need horizontal scroll support
    // Since we're in horizontal container, let's setup an observer manually if it's meant for horizontal
    // but the user said for SplitText: "Trigger on viewport entry using ScrollTrigger (or for horizontal sections, detect when the element enters the horizontal viewport)"
    // "IMPORTANT: For elements inside the horizontal scroll, the trigger needs to account for the horizontal scrolling. Use containerAnimation in ScrollTrigger or use a manual approach."

    // Let's use IntersectionObserver to be safe for both horizontal and vertical sections
    
    gsap.set(targets, { yPercent: 100 });

    const animateIn = () => {
      gsap.to(targets, {
        yPercent: 0,
        duration: duration,
        stagger: stagger,
        ease: 'textReveal',
        delay: delay,
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateIn();
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      split.revert();
    };
  }, { scope: containerRef });

  return (
    <Component ref={containerRef} className={className}>
      {children}
    </Component>
  );
};

export default SplitTextReveal;
