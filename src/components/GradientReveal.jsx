import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const GradientReveal = ({ type = 'light', className = '' }) => {
  const overlayRef = useRef(null);

  useGSAP(() => {
    const el = overlayRef.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.to(el, {
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
            duration: 1.5,
            ease: 'power3.inOut'
          });
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    observer.observe(el);

    return () => observer.disconnect();
  });

  const baseGradientClass = type === 'light' ? 'gradient-light' : 'gradient-dark';

  return (
    <div 
      ref={overlayRef}
      className={`absolute inset-0 z-10 w-full h-full ${baseGradientClass} ${className}`}
      style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
    />
  );
};

export default GradientReveal;
