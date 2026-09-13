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
}) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current || !imageRef.current) return;

    // clipPath inset(top right bottom left)
    // Start fully clipped (hidden), animate to fully visible
    let clipFrom = '';
    
    switch (direction) {
      case 'left':
        // Wipe from left → right: start fully hidden on right side
        clipFrom = 'inset(0 100% 0 0)';
        break;
      case 'right':
        // Wipe from right → left: start fully hidden on left side
        clipFrom = 'inset(0 0 0 100%)';
        break;
      case 'top':
        // Wipe from top → bottom: start fully hidden on bottom
        clipFrom = 'inset(0 0 100% 0)';
        break;
      case 'bottom':
        // Wipe from bottom → top: start fully hidden on top
        clipFrom = 'inset(100% 0 0 0)';
        break;
      default:
        clipFrom = 'inset(0 100% 0 0)';
    }

    const clipTo = 'inset(0 0% 0 0%)';

    // Container starts fully clipped — image is 100% invisible
    gsap.set(containerRef.current, { clipPath: clipFrom });
    // Image starts zoomed in for the parallax zoom-out effect
    gsap.set(imageRef.current, { scale: 1.3 });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const tl = gsap.timeline({ delay });
          
          // Clip wipes open to reveal
          tl.to(containerRef.current, {
            clipPath: clipTo,
            duration: 1.6,
            ease: 'power4.inOut'
          }, 0)
          // Image zooms out from 1.3 → 1 as the mask opens
          .to(imageRef.current, {
            scale: 1,
            duration: 2.2,
            ease: 'power3.out'
          }, 0.1);

          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <img 
        ref={imageRef} 
        src={src} 
        alt={alt} 
        className={`w-full h-full object-cover ${imgClassName}`} 
      />
    </div>
  );
};

export default ImageReveal;
