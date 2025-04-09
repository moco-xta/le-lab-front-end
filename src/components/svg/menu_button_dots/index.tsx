import React from 'react'

import './index.scss'

export default function MenuButtonDots() {
  return (
    <div id='menu-button-dots'>
      <svg
        viewBox='0 0 40 80'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle
          id='menu-button-dot-1'
          cx='20'
          cy='15'
          r={15}
        />
        <circle
          id='menu-button-dot-2'
          cx='20'
          cy='65'
          r={15}
        />
      </svg>
    </div>
  )
}
