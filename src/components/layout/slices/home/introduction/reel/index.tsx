'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.scss';

gsap.registerPlugin(ScrollTrigger);

const Reel = () => {
  const svgRef = useRef<SVGSVGElement>(null!);
  const container1Ref = useRef<HTMLDivElement>(null!);
  const container2Ref = useRef<HTMLDivElement>(null!);
  const sectionRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const svg = svgRef.current;
    const container1 = container1Ref.current;
    const container2 = container2Ref.current;
    const section = sectionRef.current;

    if (!svg || !container1 || !container2 || !section) return;

    const initAnimation = () => {
      // Get positions relative to document
      const container1Pos = container1.getBoundingClientRect();
      const container2Pos = container2.getBoundingClientRect();
      const scrollY = window.scrollY;

      // Convert to absolute document coordinates
      const startX = container1Pos.left;
      const startY = container1Pos.top + scrollY;
      const endX = container2Pos.left;
      const endY = container2Pos.top + scrollY;

      // Set initial SVG position (absolutely positioned)
      gsap.set(svg, {
        position: 'absolute',
        top: startY,
        left: startX,
        width: container1Pos.width,
        height: container1Pos.height,
        opacity: 1,
        display: 'block'
      });

      // Create the animation timeline
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        markers: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const currentScrollY = window.scrollY;

          // Calculate current position (absolute document coordinates)
          const currentX = startX + (endX - startX) * progress;
          const currentY = startY + (endY - startY) * progress - currentScrollY;

          // Calculate current size
          const currentWidth = container1Pos.width + 
            (container2Pos.width - container1Pos.width) * progress;
          const currentHeight = container1Pos.height + 
            (container2Pos.height - container1Pos.height) * progress;

          // Apply transformations
          gsap.to(svg, {
            top: currentY,
            left: currentX,
            width: currentWidth,
            height: currentHeight,
            duration: 0.1,
            overwrite: true
          });
        }
      });
    };

    // Handle resize and initial load
    const onResize = () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      initAnimation();
    };

    window.addEventListener('resize', onResize);
    const timeout = setTimeout(initAnimation, 100);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', onResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="section">
      <svg
        ref={svgRef}
        className="transferSvg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ display: 'none' }}
      >
        <rect width="100" height="100" fill="#FF0000" opacity="1" />
      </svg>

      <div ref={container1Ref} id="initial" className="benchmark">
        First Container
      </div>
      <div ref={container2Ref} id="final" className="benchmark">
        Second Container
      </div>
    </section>
  );
};

export default Reel;