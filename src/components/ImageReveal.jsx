import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const ImageReveal = ({ 
  src, 
  alt = '', 
  direction = 'left', 
  className = '', 
  imgClassName = '',
  delay = 0,
  maskColor = '#000000',
}) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);

  useGSAP(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    const overlay = overlayRef.current;
    if (!container || !image || !overlay) return;

    // Image starts zoomed in
    gsap.set(image, { scale: 1.3 });

    // Overlay transform direction
    let transformTo = {};
    switch (direction) {
      case 'left':   transformTo = { xPercent: -105 }; break;
      case 'right':  transformTo = { xPercent: 105 };  break;
      case 'top':    transformTo = { yPercent: -105 }; break;
      case 'bottom': transformTo = { yPercent: 105 };  break;
      default:       transformTo = { xPercent: -105 };
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const tl = gsap.timeline({ delay });

          // Slide the overlay away
          tl.to(overlay, {
            ...transformTo,
            duration: 1.6,
            ease: 'power4.inOut',
          }, 0)
          // Zoom the image down
          .to(image, {
            scale: 1,
            duration: 2.2,
            ease: 'power3.out',
          }, 0.2);

          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });

    observer.observe(container);

    return () => observer.disconnect();
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${imgClassName}`}
      />
      {/* Solid overlay — slides away to reveal image */}
      <div
        ref={overlayRef}
        className="absolute z-10"
        style={{
          top: '-5px',
          left: '-5px',
          right: '-5px',
          bottom: '-5px',
          backgroundColor: maskColor,
        }}
      />
    </div>
  );
};

export default ImageReveal;
