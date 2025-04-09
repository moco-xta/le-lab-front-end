import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { AiFillGithub } from 'react-icons/ai'
import { FaInstagram } from 'react-icons/fa'
import { IoLogoLinkedin } from 'react-icons/io'
import { FaPinterest } from 'react-icons/fa'

import { RootState } from '@/redux/store'

import './index.scss'

export default function Socials({ isSmallScreen }: { isSmallScreen: boolean }) {
  const { menu } = useSelector((state: RootState) => state.appState)

  const timelineRef = useRef<GSAPTimeline>(gsap.timeline({ paused: true }))

  useGSAP(() => {
    timelineRef.current.to(
      '.socials-icon',
      {
        translateY: 0,
        opacity: 1,
        duration: 0.35,
        ease: 'power1.out',
        stagger: {
          each: 0.05,
        },
      },
      0.25,
    )
  })

  useEffect(() => {
    if (menu.isOpen) {
      timelineRef.current.play()
    } else {
      timelineRef.current.reverse()
    }
  }, [menu.isOpen])

  return (
    <div id='socials-container'>
      <FaInstagram
        className='socials-icon'
        size={!isSmallScreen ? 27 : 35}
      />
      <FaPinterest
        className='socials-icon'
        size={!isSmallScreen ? 27 : 35}
      />
      <IoLogoLinkedin
        className='socials-icon'
        size={!isSmallScreen ? 27 : 35}
      />
      <AiFillGithub
        className='socials-icon'
        size={!isSmallScreen ? 27 : 35}
      />
    </div>
  )
}
