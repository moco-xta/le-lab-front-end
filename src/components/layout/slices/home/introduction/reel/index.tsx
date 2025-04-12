import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import anime from 'animejs'

import { default as videosConstants } from '@/constants/assets/videosConstants.json'

import './index.scss'

const Reel = ({ sectionRef }: { sectionRef: React.RefObject<HTMLDivElement> }) => {
  const svgRef = useRef<SVGSVGElement>(null!)
  // const pathRef = useRef<SVGPathElement>(null!)
  const initialContainerRef = useRef<HTMLDivElement>(null!)
  const targetContainerRef = useRef<HTMLDivElement>(null!)

  /* const pathRef = useRef<SVGPathElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null) */

  /* useEffect(() => {
    if (typeof window === 'undefined' || !pathRef.current) return

    const morphAnimation = anime({
      targets: pathRef.current,
      d: [
        {
          value:
            'M20,20 L100,20 Q150,50 100,80 L20,80 Z',
        },
      ],
      easing: 'linear',
      duration: 1,
      autoplay: false,
    })

    gsap.to(morphAnimation, {
      progress: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.container',
        start: 'top center',
        end: 'top top',
        scrub: 1,
        // markers: true,
      },
      onUpdate: () => {
        morphAnimation.seek(morphAnimation.duration * morphAnimation.progress)
      },
    })

    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        const playButton = document.createElement('button')
        playButton.innerHTML = 'Play Video'
        Object.assign(playButton.style, {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '10px 20px',
          cursor: 'pointer',
        })
        playButton.onclick = () => {
          videoRef.current?.play()
          playButton.remove()
        }
        document.getElementById('morph_video_container')?.appendChild(playButton)
      })
    }
  }, []) */

  useEffect(() => {
    const svg = svgRef.current
    // const path = pathRef.current
    const section = sectionRef.current
    const initialContainer = initialContainerRef.current
    const targetContainer = targetContainerRef.current

    if (!svg || !initialContainer || !targetContainer || !section) return

    const initAnimation = () => {
      const sectionBCR = section.getBoundingClientRect()
      const initialContainerBCR = initialContainer.getBoundingClientRect()
      const targetContainerBCR = targetContainer.getBoundingClientRect()

      const startX = initialContainerBCR.left
      const startY = initialContainerBCR.top - sectionBCR.top
      const endX = targetContainerBCR.left
      const endY = targetContainerBCR.top - sectionBCR.top

      gsap.set(svg, {
        top: startY,
        left: startX,
        width: initialContainerBCR.width,
        height: initialContainerBCR.height,
        opacity: 1,
        display: 'block',
      })

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        markers: true,
        onUpdate: (self) => {
          const progress = self.progress

          const currentX = startX + (endX - startX) * progress
          const currentY = startY + (endY - startY) * progress

          const currentWidth =
            initialContainerBCR.width +
            (targetContainerBCR.width - initialContainerBCR.width) * progress
          const currentHeight =
            initialContainerBCR.height +
            (targetContainerBCR.height - initialContainerBCR.height) * progress

          gsap.to(svg, {
            top: currentY,
            left: currentX,
            width: currentWidth,
            height: currentHeight,
            duration: 0.1,
            overwrite: true,
          })
        },
      })
    }

    const onResize = () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
      initAnimation()
    }

    window.addEventListener('resize', onResize)
    const timeout = setTimeout(initAnimation, 100)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener('resize', onResize)
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [sectionRef])

  return (
    <>
      <svg
        ref={svgRef}
        id='reel-svg'
        viewBox='0 0 16 9'
        preserveAspectRatio='xMidYMid meet'
        style={{
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <foreignObject
          width='100%'
          height='100%'
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'center',
              display: 'block',
            }}
          >
            <source
              src={videosConstants.REEL}
              type='video/mp4'
            />
          </video>
        </foreignObject>
      </svg>

      {/* <div
        id='morph_video_container'
        className='container'
      >
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            clipPath: 'url(#morphClip)',
            objectFit: 'fill',
          }}
          controls
        >
          <source
            src={videosConstants.REEL}
            type='video/mp4'
          />
        </video>

        <svg
          viewBox='0 0 100 100'
          preserveAspectRatio='xMidYMid meet'
          style={{ position: 'absolute', width: 0, height: 0 }}
        >
          <defs>
            <clipPath
              id='morphClip'
              clipPathUnits='objectBoundingBox'
            >
              <path
                ref={pathRef}
                d='M20,20 L100,20 Q150,50 100,80 L20,80 Z'
                transform='scale(0.005)'
              />
            </clipPath>
          </defs>
        </svg>
      </div> */}

      <div
        ref={initialContainerRef}
        id='initial-container'
        className='reel-container'
      >
        First Container
      </div>
      <div
        ref={targetContainerRef}
        id='target-container'
        className='reel-container'
      >
        Second Container
      </div>
    </>
  )
}

export default Reel
