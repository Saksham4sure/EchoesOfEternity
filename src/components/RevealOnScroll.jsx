import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const RevealOnScroll = ({
  children,
  type = 'fadeUp',
  delay = 0,
  duration = 1.2,
  threshold = 0.1,
  className = '',
  once = true
}) => {
  const ref = useRef(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    let initialVars = { opacity: 0 };
    let toVars = { 
      opacity: 1, 
      duration: duration, 
      delay: delay, 
      ease: 'power3.out' 
    };

    switch (type) {
      case 'fadeUp':
        initialVars.y = 50;
        toVars.y = 0;
        toVars.ease = 'expo.out';
        break;
      case 'fadeIn':
        break;
      case 'scaleUp':
        initialVars.scale = 0.8;
        toVars.scale = 1;
        toVars.ease = 'power3.out';
        break;
      case 'clipReveal':
        initialVars.clipPath = 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)';
        initialVars.opacity = 1;
        toVars.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
        toVars.ease = 'expo.out';
        break;
      case 'slideLeft':
        initialVars.x = 50;
        toVars.x = 0;
        toVars.ease = 'expo.out';
        break;
      case 'slideRight':
        initialVars.x = -50;
        toVars.x = 0;
        toVars.ease = 'expo.out';
        break;
      default:
        break;
    }

    gsap.set(el, initialVars);

    const animate = () => {
      gsap.to(el, toVars);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate();
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          gsap.set(el, initialVars);
        }
      });
    }, {
      threshold: threshold
    });

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default RevealOnScroll;
