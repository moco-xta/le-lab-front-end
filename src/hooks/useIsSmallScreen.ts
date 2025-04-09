import { useState, useEffect } from 'react'

export default function useIsSmallScreen(breakpointVar: string) {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const breakpoint = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(breakpointVar).trim(),
        10,
      )

      const checkScreenSize = () => {
        setIsSmallScreen(window.innerWidth < breakpoint)
      }

      checkScreenSize() // Initial check
      window.addEventListener('resize', checkScreenSize)
      return () => window.removeEventListener('resize', checkScreenSize)
    }
  }, [breakpointVar])

  return isSmallScreen
}
