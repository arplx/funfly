import React from 'react'
import Navbar from './Navbar'
import LinearProgress from '@mui/material/LinearProgress'


export default function Feed() {
  return (
    <div className='feed-container'>
        <Navbar />
        <div className="video-container">
            <div className="post-container">
                <video />
            </div>
            <LinearProgress variant="determinate" value={30} sx={{mt:"0.2rem", mb:"0.5rem"}} />
            <div className="post-container">
                <video />
            </div>
            <div className="post-container">
                <video />
            </div>
        </div>
    </div>
  )
}
