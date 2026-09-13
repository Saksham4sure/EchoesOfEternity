import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const isVisible = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Hide both initially
    gsap.set([cursor, follower], { opacity: 0, xPercent: -50, yPercent: -50 });

    const onMouseMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;

      if (!isVisible.current) {
        isVisible.current = true;
        gsap.to([cursor, follower], { opacity: 1, duration: 0.3 });
      }

      // Small dot follows instantly
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      // Blurry follower trails behind with smooth lerp
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.8,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    };

    const onMouseLeave = () => {
      isVisible.current = false;
      gsap.to([cursor, follower], { opacity: 0, duration: 0.3 });
    };

    const onMouseEnter = () => {
      isVisible.current = true;
      gsap.to([cursor, follower], { opacity: 1, duration: 0.3 });
    };

    // Scale up on interactive elements
    const onHoverEnter = () => {
      gsap.to(cursor, { scale: 0.5, duration: 0.3, ease: 'power2.out' });
      gsap.to(follower, { scale: 1.8, duration: 0.4, ease: 'power2.out' });
    };

    const onHoverLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3, ease: 'power2.out' });
      gsap.to(follower, { scale: 1, duration: 0.4, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Attach hover effects to all interactive elements
    const interactives = document.querySelectorAll('a, button, [data-cursor-hover]');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onHoverEnter);
      el.addEventListener('mouseleave', onHoverLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onHoverEnter);
        el.removeEventListener('mouseleave', onHoverLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Small center dot */}
      <div
        ref={cursorRef}
        className="custom-cursor-dot"
        aria-hidden="true"
      />
      {/* Large blurry follower */}
      <div
        ref={followerRef}
        className="custom-cursor-follower"
        aria-hidden="true"
      />
    </>
  );
};

export default CustomCursor;
