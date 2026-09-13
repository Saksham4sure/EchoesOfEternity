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
  maskColor = 'dark'
}) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const maskRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Set initial states — image starts scaled up and invisible
    gsap.set(imageRef.current, { scale: 1.2, opacity: 0 });
    
    let maskInitial = '';
    let maskFinal = '';

    switch (direction) {
      case 'left':
        maskInitial = 'inset(0 0 0 0)';
        maskFinal = 'inset(0 100% 0 0)';
        break;
      case 'right':
        maskInitial = 'inset(0 0 0 0)';
        maskFinal = 'inset(0 0 0 100%)';
        break;
      case 'top':
        maskInitial = 'inset(0 0 0 0)';
        maskFinal = 'inset(0 0 100% 0)';
        break;
      case 'bottom':
        maskInitial = 'inset(0 0 0 0)';
        maskFinal = 'inset(100% 0 0 0)';
        break;
      default:
        maskInitial = 'inset(0 0 0 0)';
        maskFinal = 'inset(0 100% 0 0)';
    }

    gsap.set(maskRef.current, { clipPath: maskInitial });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const tl = gsap.timeline({ delay: delay });
          
          // Show the image immediately when animation starts
          tl.set(imageRef.current, { opacity: 1 }, 0)
          .to(maskRef.current, {
            clipPath: maskFinal,
            duration: 1.5,
            ease: 'power4.inOut'
          }, 0)
          .to(imageRef.current, {
            scale: 1,
            duration: 2,
            ease: 'power4.inOut'
          }, 0);

          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, { scope: containerRef });

  const maskBg = maskColor === 'light' ? 'bg-[#eeeeee]' : 'bg-black';

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <img 
        ref={imageRef} 
        src={src} 
        alt={alt} 
        className={`w-full h-full object-cover ${imgClassName}`} 
      />
      <div 
        ref={maskRef} 
        className={`absolute inset-0 ${maskBg} z-10`}
      />
    </div>
  );
};

export default ImageReveal;
