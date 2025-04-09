import { useState, useEffect } from 'react'

import styles from '@/styles/variables.module.scss'

export default function useIsSmallScreen(breakpointVar: string) {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const breakpointS = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(breakpointVar).trim(),
        10,
      )

      const checkScreenSize = () => {
        setIsSmallScreen(window.innerWidth < breakpointS)
      }

      checkScreenSize() // Initial check
      window.addEventListener('resize', checkScreenSize)
      return () => window.removeEventListener('resize', checkScreenSize)
    }
  }, [])

  return isSmallScreen
}
