import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';

// ── Import every image used across the site ──
import home1 from '../assets/images/home1.jpg';
import home2 from '../assets/images/home2.jpg';
import home3 from '../assets/images/home3.jpg';
import home4 from '../assets/images/home4.jpg';
import home5 from '../assets/images/home5.jpg';
import dynasty from '../assets/images/lostdynasty.jpeg';
import small2 from '../assets/images/lostdynasty2.jpg';
import temple1 from '../assets/images/temple1.jpeg';
import temple2 from '../assets/images/temple2.jpeg';
import temple4 from '../assets/images/temple4.jpeg';

const ALL_IMAGES = [
  home1, home2, home3, home4, home5,
  dynasty, small2,
  temple1, temple2, temple4,
];

const MIN_DISPLAY_MS = 2000;
const FALLBACK_TIMEOUT_MS = 10000;

const Preloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const counterRef = useRef(null);
  const percentRef = useRef(null);
  const progressRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const panelLeftRef = useRef(null);
  const panelRightRef = useRef(null);
  const lineLeftRef = useRef(null);
  const lineRightRef = useRef(null);

  const counterObj = useRef({ value: 0 });
  const [readyToExit, setReadyToExit] = useState(false);
  const minTimeReached = useRef(false);
  const assetsLoaded = useRef(false);

  const lenis = useLenis();

  // ── Stop Lenis during preload ──
  useEffect(() => {
    if (lenis) lenis.stop();
  }, [lenis]);

  // ── Check if both conditions met ──
  const tryExit = useCallback(() => {
    if (minTimeReached.current && assetsLoaded.current) {
      setReadyToExit(true);
    }
  }, []);

  // ── Minimum display timer ──
  useEffect(() => {
    const timer = setTimeout(() => {
      minTimeReached.current = true;
      tryExit();
    }, MIN_DISPLAY_MS);
    return () => clearTimeout(timer);
  }, [tryExit]);

  // ── Preload all images + wait for fonts ──
  useEffect(() => {
    let loaded = 0;
    const total = ALL_IMAGES.length;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const onImageDone = () => {
      loaded++;
      const progress = loaded / total;

      // Animate counter number
      gsap.to(counterObj.current, {
        value: Math.round(progress * 100),
        duration: 0.5,
        ease: 'power1.out',
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = Math.round(counterObj.current.value);
          }
        },
      });

      // Animate progress bar width
      gsap.to(progressRef.current, {
        scaleX: progress,
        duration: 0.7,
        ease: 'power2.out',
      });

      if (loaded >= total) {
        assetsLoaded.current = true;
        tryExit();
      }
    };

    // Wait for fonts first, then start image preloading
    document.fonts.ready.then(() => {
      ALL_IMAGES.forEach((src) => {
        const img = new Image();
        img.onload = onImageDone;
        img.onerror = onImageDone; // count errors to avoid hanging
        img.src = src;
      });
    });

    // Fallback — never hang forever
    const fallback = setTimeout(() => {
      assetsLoaded.current = true;
      tryExit();
    }, FALLBACK_TIMEOUT_MS);

    return () => clearTimeout(fallback);
  }, [tryExit]);

  // ── Intro animation ──
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Decorative lines grow from center
    tl.from([lineLeftRef.current, lineRightRef.current], {
      scaleX: 0,
      duration: 0.8,
    }, 0);

    // Title fades up
    tl.from(titleRef.current, {
      y: 25,
      opacity: 0,
      duration: 1,
    }, 0.2);

    // Counter scales in
    tl.from(counterRef.current, {
      y: 50,
      opacity: 0,
      scale: 0.8,
      duration: 0.9,
    }, 0.4);

    // Percent sign
    tl.from(percentRef.current, {
      opacity: 0,
      x: -10,
      duration: 0.5,
    }, 0.7);

    // Subtitle
    tl.from(subtitleRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.6,
    }, 0.8);
  }, []);

  // ── Exit animation ──
  useEffect(() => {
    if (!readyToExit) return;

    const tl = gsap.timeline({
      onComplete: () => {
        // Cleanup
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        if (preloaderRef.current) preloaderRef.current.style.display = 'none';

        // Restart smooth scroll
        if (lenis) lenis.start();

        // Recalculate all scroll positions
        ScrollTrigger.refresh();
        onComplete?.();
      },
    });

    // 1. Subtitle fades out
    tl.to(subtitleRef.current, {
      y: -15,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
    });

    // 2. Progress bar shrinks and fades
    tl.to(progressRef.current, {
      scaleX: 0,
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in',
    }, '-=0.1');

    // 3. Percent sign fades
    tl.to(percentRef.current, {
      opacity: 0,
      x: 10,
      duration: 0.25,
      ease: 'power2.in',
    }, '-=0.2');

    // 4. Counter scales up and fades
    tl.to(counterRef.current, {
      y: -30,
      scale: 1.1,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.in',
    }, '-=0.2');

    // 5. Title slides up
    tl.to(titleRef.current, {
      y: -25,
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in',
    }, '-=0.3');

    // 6. Decorative lines shrink
    tl.to([lineLeftRef.current, lineRightRef.current], {
      scaleX: 0,
      duration: 0.3,
      ease: 'power2.in',
    }, '-=0.2');

    // 7. Panels split apart — the grand reveal
    tl.to(panelLeftRef.current, {
      xPercent: -100,
      duration: 1.2,
      ease: 'power4.inOut',
    }, '-=0.05');

    tl.to(panelRightRef.current, {
      xPercent: 100,
      duration: 1.2,
      ease: 'power4.inOut',
    }, '<'); // same time as left panel
  }, [readyToExit, lenis, onComplete]);

  return (
    <div ref={preloaderRef} className="preloader" aria-hidden="true">
      {/* ── Split panels (black background) ── */}
      <div ref={panelLeftRef} className="preloader-panel preloader-panel--left" />
      <div ref={panelRightRef} className="preloader-panel preloader-panel--right" />

      {/* ── Content layer ── */}
      <div className="preloader-content">
        {/* Site name */}
        <p ref={titleRef} className="preloader-title">
          ECHOES&ensp;OF&ensp;ETERNITY
        </p>

        {/* Decorative lines flanking the counter */}
        <div className="preloader-lines">
          <span ref={lineLeftRef} className="preloader-line preloader-line--left" />
          <span ref={lineRightRef} className="preloader-line preloader-line--right" />
        </div>

        {/* Large percentage counter */}
        <div className="preloader-counter-wrap">
          <span ref={counterRef} className="preloader-counter libre">
            0
          </span>
          <span ref={percentRef} className="preloader-percent libre">
            %
          </span>
        </div>

        {/* Progress bar */}
        <div className="preloader-progress-track">
          <div ref={progressRef} className="preloader-progress-fill" />
        </div>

        {/* Loading text */}
        <p ref={subtitleRef} className="preloader-subtitle">
          Loading Experience
        </p>
      </div>
    </div>
  );
};

export default Preloader;
