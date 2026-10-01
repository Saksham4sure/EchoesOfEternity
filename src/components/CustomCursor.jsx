import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const isVisible = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Hide both initially
    gsap.set([cursor, follower], { opacity: 0, xPercent: -50, yPercent: -50 });

    // ── PERF FIX: gsap.quickTo() creates a SINGLE reusable tween per property.
    // The old code called gsap.to() on every mousemove, creating ~120 new
    // tweens/sec that had to be garbage-collected. quickTo is dramatically cheaper.
    const xDot = gsap.quickTo(cursor, 'x', { duration: 0.15, ease: 'power2.out' });
    const yDot = gsap.quickTo(cursor, 'y', { duration: 0.15, ease: 'power2.out' });
    const xFollower = gsap.quickTo(follower, 'x', { duration: 0.6, ease: 'power3.out' });
    const yFollower = gsap.quickTo(follower, 'y', { duration: 0.6, ease: 'power3.out' });

    const onMouseMove = (e) => {
      if (!isVisible.current) {
        isVisible.current = true;
        gsap.to([cursor, follower], { opacity: 1, duration: 0.3 });
      }

      // Just update the target value — no new tween allocation
      xDot(e.clientX);
      yDot(e.clientY);
      xFollower(e.clientX);
      yFollower(e.clientY);
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

    // { passive: true } lets the browser optimize — we don't call preventDefault
    window.addEventListener('mousemove', onMouseMove, { passive: true });
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
