import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitTextReveal from '../components/SplitTextReveal';
import RevealOnScroll from '../components/RevealOnScroll';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const marqueeRef = useRef(null);
  const linksRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Infinite marquee scroll
      const marquee = marqueeRef.current;
      if (marquee) {
        const marqueeWidth = marquee.scrollWidth / 2;
        gsap.to(marquee, {
          x: -marqueeWidth,
          duration: 20,
          ease: 'none',
          repeat: -1,
        });
      }

      // Stagger the footer links/columns on scroll
      const columns = linksRef.current?.querySelectorAll('.footer-col');
      if (columns?.length) {
        gsap.fromTo(columns,
          { yPercent: 30, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: linksRef.current,
              start: 'top 85%',
              once: true,
            }
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const navLinks = [
    { label: 'The Lost Dynasty', section: 'Hall I' },
    { label: 'The Sacred Temple', section: 'Hall II' },
    { label: 'Forgotten Scripts', section: 'Hall III' },
    { label: 'Eternal Gardens', section: 'Hall IV' },
  ];

  const marqueeText = 'ECHOES OF ETERNITY • JOURNEY THROUGH TIME • RELICS & MANUSCRIPTS • SACRED ARTIFACTS • ';

  return (
    <footer ref={footerRef} className="bg-[#0a0a0a] text-[#cccccc] relative overflow-hidden">
      
      {/* Large display heading */}
      <div className="pt-20 md:pt-32 px-6 md:px-16">
        <SplitTextReveal 
          as="h2" 
          splitType="chars" 
          stagger={0.03}
          duration={1.4}
          className="text-6xl md:text-[8rem] lg:text-[10rem] leading-[0.9] libre text-[#eeeeee] tracking-tight"
        >
          The past is never truly gone.
        </SplitTextReveal>
      </div>

      {/* Gradient accent line */}
      <div className="mt-12 md:mt-20 mx-6 md:mx-16">
        <RevealOnScroll type="clipReveal">
          <div className="h-px w-full gradient-accent" />
        </RevealOnScroll>
      </div>

      {/* Footer content grid */}
      <div ref={linksRef} className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 px-6 md:px-16 pt-12 md:pt-16 pb-10">
        
        {/* Navigation */}
        <div className="footer-col">
          <h4 className="text-xs uppercase tracking-[0.3em] text-[#666666] mb-6">Navigate</h4>
          <ul className="space-y-3">
            {navLinks.map((link, i) => (
              <li key={i}>
                <a 
                  href="#" 
                  data-cursor-hover
                  className="group flex items-baseline gap-3 text-sm text-[#999999] hover:text-[#eeeeee] transition-colors duration-300"
                >
                  <span className="text-[10px] text-[#555555] group-hover:text-[#c9a96e] transition-colors duration-300">{link.section}</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* About */}
        <div className="footer-col">
          <h4 className="text-xs uppercase tracking-[0.3em] text-[#666666] mb-6">About</h4>
          <p className="text-sm leading-6 text-[#888888]">
            A curated journey through civilizations lost to time. Each hall preserves fragments of empires 
            that shaped history through art, architecture, knowledge, and belief.
          </p>
        </div>

        {/* Details */}
        <div className="footer-col">
          <h4 className="text-xs uppercase tracking-[0.3em] text-[#666666] mb-6">Visit</h4>
          <div className="space-y-3 text-sm text-[#888888]">
            <p>Open Daily</p>
            <p>10:00 AM — 6:00 PM</p>
            <p className="pt-2 text-[#666666]">Free Admission</p>
          </div>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4 className="text-xs uppercase tracking-[0.3em] text-[#666666] mb-6">Connect</h4>
          <div className="space-y-3">
            {['Instagram', 'Twitter', 'Behance'].map((social, i) => (
              <a 
                key={i}
                href="#" 
                data-cursor-hover
                className="block text-sm text-[#888888] hover:text-[#c9a96e] transition-colors duration-300"
              >
                {social} ↗
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="border-t border-[#1a1a1a] py-4 overflow-hidden">
        <div ref={marqueeRef} className="flex whitespace-nowrap">
          {/* Duplicate text for seamless loop */}
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-[11px] tracking-[0.5em] text-[#333333] uppercase mx-4 shrink-0">
              {marqueeText}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1a1a1a] px-6 md:px-16 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[11px] text-[#444444] tracking-wide">
          © {new Date().getFullYear()} Echoes of Eternity. All fragments preserved.
        </p>
        <p className="text-[11px] text-[#333333] tracking-wide libre italic">
          "What is remembered, lives."
        </p>
      </div>

      {/* Subtle gradient glow at top */}
      <div className="absolute top-0 left-0 w-full h-40 pointer-events-none" 
           style={{ background: 'linear-gradient(to bottom, rgba(201,169,110,0.03) 0%, transparent 100%)' }} />
    </footer>
  );
};

export default Footer;
