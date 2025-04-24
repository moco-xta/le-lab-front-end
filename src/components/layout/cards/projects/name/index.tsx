import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { FaArrowRight } from 'react-icons/fa'

import { splitTextToCharacters } from '@/helpers/textHelpers'

import './index.scss'

export default function ProjectCardName({ index, name }: { index: number; name: string }) {
  const containerRef = useRef<HTMLDivElement>(null!)
  const charactersRef = useRef<NodeListOf<Element> | null>(null!)
  const cardRef = useRef<Element | null>(null!)

  useEffect(() => {
    if (containerRef.current) {
      charactersRef.current = containerRef.current.querySelectorAll('.project-card-name-character')
      cardRef.current = document.querySelector(`#project-card-${index}`)
    }
  }, [index])

  useGSAP(
    () => {
      if (!containerRef.current || !cardRef.current || !charactersRef.current) return

      const container = containerRef.current

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          end: 'bottom 70%',
          markers: true,
        },
      })

      tl.to(container.querySelector('.project-card-name'), {
        translateY: '41%',
        duration: 1.5,
      })
        .to(
          container.querySelectorAll('.project-card-name-item'),
          {
            translateY: '0%',
            duration: 1.5,
            ease: 'power1.out',
          },
          0,
        )
        .to(
          container.querySelectorAll('.project-card-name-character'),
          {
            translateY: '0%',
            opacity: 1,
            duration: 0.75,
            ease: 'sine.inOut',
            stagger: {
              each: 0.045,
              from: 'center',
              grid: 'auto',
              axis: 'x',
            },
            motionPath: {
              path: [
                { x: 0, y: 0 },
                { x: 0, y: -5 },
                { x: 0, y: 0 },
              ],
              curviness: 0.5,
            },
          },
          0,
        )
    },
    { scope: containerRef },
  )

  return (
    <div
      ref={containerRef}
      className='project-card-name-wrapper'
    >
      <div
        id={`project-card-name-${index}`}
        className='project-card-name-container'
      >
        <FaArrowRight
          id={`project-card-arrow-${index}`}
          className='project-card-arrow'
          size={25}
        />
        <div className='last-project-name'>
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <span
                key={`last_project_name_${index}_${i}`}
                className='last-project-name-item'
              >
                {splitTextToCharacters(name).map((letter, index) => (
                  <span
                    key={`last_project_name_character_${name}_${i}_${index}`}
                    className='last-project-name-character'
                  >
                    {letter}
                  </span>
                ))}
              </span>
            ))}
        </div>
      </div>
    </div>
  )
}
