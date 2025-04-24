import { useEffect, useRef } from 'react'

export function useScrollSpeed(smoothingFactor = 0.2) {
  const lastScrollY = useRef(0)
  const lastTime = useRef(performance.now())
  const speedRef = useRef(0)
  const smoothedSpeed = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const currentTime = performance.now()
      const deltaY = currentScrollY - lastScrollY.current
      const deltaTime = currentTime - lastTime.current

      if (deltaTime > 0) {
        const currentSpeed = deltaY / deltaTime

        // Apply exponential moving average
        smoothedSpeed.current =
          smoothingFactor * currentSpeed + (1 - smoothingFactor) * smoothedSpeed.current

        speedRef.current = smoothedSpeed.current
      }

      lastScrollY.current = currentScrollY
      lastTime.current = currentTime
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [smoothingFactor])

  return speedRef
}
