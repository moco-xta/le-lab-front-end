import { useState, useEffect } from 'react'

import styles from '@/styles/variables.module.scss'

export default function useIsSmallScreen() {
  const [screenBreakpoint] = useState<number>(parseInt(styles.screenBreakpoint, 10))
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(window.innerWidth < screenBreakpoint)

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < screenBreakpoint)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [screenBreakpoint])

  return isSmallScreen
}
