import React from 'react'
import Navbar from './Navbar'
import LinearProgress from '@mui/material/LinearProgress'
import Avatar from "@mui/material/Avatar"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


export default function Feed() {
  return (
    <div className='feed-container'>
        <Navbar />
        <div className="video-container">
            <div className="post-container">
                <video />
                <div className="video-info">
                    <div className="avatar-container">
                    <Avatar alt='profile' sx={{margin:"0.5rem"}}/>
                    <p>thissideaditya</p>
                    </div>
                    <div className="post-like">
                        <FavoriteBorderIcon sx={{color:"white"}}/>
                        <p style={{marginTop:"0.3rem", color:"white"}}>1M</p>
                    </div>
                </div>
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
