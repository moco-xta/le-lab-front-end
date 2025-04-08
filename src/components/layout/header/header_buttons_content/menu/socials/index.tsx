import React from 'react'
import { AiFillGithub } from 'react-icons/ai'
import { FaInstagram } from 'react-icons/fa'
import { IoLogoLinkedin } from 'react-icons/io'
import { FaPinterest } from 'react-icons/fa'

import './index.scss'

export default function Socials() {
  return (
    <div id='socials-container'>
      <FaInstagram
        className='socials-icons'
        size={27}
      />
      <FaPinterest
        className='socials-icons'
        size={27}
      />
      <IoLogoLinkedin
        className='socials-icons'
        size={27}
      />
      <AiFillGithub
        className='socials-icons'
        size={27}
      />
    </div>
  )
}
