import React from 'react'
import { AiFillThunderbolt } from 'react-icons/ai'
import { HiMiniArrowDownCircle } from 'react-icons/hi2'
import { LuCircleArrowDown } from 'react-icons/lu'
import { FaArrowDown } from 'react-icons/fa'
// import { BsFire } from "react-icons/bs";

import './index.scss'

export default function ScrollToExplore() {
  return (
    <div id='scroll-to-explore'>
      <AiFillThunderbolt
        id='thunder-icon-left'
        className='thunder-icon'
      />
      <FaArrowDown
        id='arrow-down-icon-left'
        className='arrow-down-icon'
      />
      {/* <BsFire id='fire-icon-left' className='fire-icon' size={15} /> */}
      <span>Scroll to explore</span>
      {/* <BsFire id='fire-icon-right' className='fire-icon' size={15} /> */}
      <FaArrowDown
        id='arrow-down-icon-right'
        className='arrow-down-icon'
        size={15}
      />
      <AiFillThunderbolt
        id='thunder-icon-right'
        className='thunder-icon'
        size={20}
      />
    </div>
  )
}
