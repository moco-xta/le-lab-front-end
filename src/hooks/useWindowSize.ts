import { useState, useEffect } from 'react'

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const screenBreakpoint = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--max-width').trim(),
      10,
    )

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
      setIsSmallScreen(window.innerWidth < screenBreakpoint)
    }

    // Initialize values
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { windowSize, isSmallScreen }
}