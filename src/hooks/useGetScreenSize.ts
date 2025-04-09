import { useState, useEffect, useRef } from 'react'

export default function useGetScreenSize(breakpointVars: string[]) {
  const [screenSize, setScreenSize] = useState<string>('')

  const breakpointsRef = useRef<number[]>([])

  useEffect(() => {
    console.log(screenSize)
  }, [screenSize])

  useEffect(() => {
    const breakpointNames = ['XS', 'S', 'M', 'L']

    if (typeof window !== 'undefined') {
      breakpointsRef.current = breakpointVars.map((breakpointVar) =>
        parseInt(
          getComputedStyle(document.documentElement).getPropertyValue(breakpointVar).trim(),
          10,
        ),
      )

      const checkScreenSize = () => {
        const currentBreakpoint = breakpointsRef.current.find(
          (breakpoint) => window.innerWidth < breakpoint,
        )
        setScreenSize(
          breakpointNames[
            breakpointsRef.current.indexOf(
              currentBreakpoint || breakpointsRef.current[breakpointsRef.current.length - 1],
            )
          ],
        )
      }

      checkScreenSize() // Initial check
      window.addEventListener('resize', checkScreenSize)
      return () => window.removeEventListener('resize', checkScreenSize)
    }
  }, [breakpointVars, screenSize])

  return screenSize
}
