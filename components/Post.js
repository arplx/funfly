import { Avatar } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import React from 'react'

function Post({postData}) {
    console.log("data", postData)
  return (
    <div className="post-container">
                <video src={postData.postURL} autoPlay />
                <div className="video-info">
                    <div className="avatar-container">
                    <Avatar alt={postData.profileName} sx={{margin:"0.5rem"}} src={postData.profilePhotoURL} />
                    <p>{postData.profileName}</p>
                    </div>
                    <div className="post-like">
                        <FavoriteBorderIcon sx={{color:"white"}}/>
                        <p style={{marginTop:"0.3rem", color:"white"}}>{postData.likes.length}</p>
                    </div>
                </div>
            </div>
  )
}

export default Post