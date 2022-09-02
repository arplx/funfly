import { Avatar, Button } from '@mui/material'
import React from 'react'
import Navbar from '../components/Navbar'
import MovieCreationRoundedIcon from '@mui/icons-material/MovieCreationRounded';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import pic from '../assets/pic.jpeg'
import Image from 'next/image';
import { useContext } from 'react';
import { AuthContext } from '../context/auth';

function Profile() {
    const { user } = useContext(AuthContext)
    return (
        <div className='profile-container'>
            <Navbar />
            <div className="profile-details" >
                <div className="dp">
                    <Avatar sx={{ width: "10rem", height: "10rem" }} />
                </div>
                <div className="details">
                    <div className="profile-username">
                        <div style={{ fontSize: "28px", fontWeight: "250" }}>Aditya Chaurasia</div>
                        <Button variant='outlined' sx={{ marginLeft: "1rem" }}>Edit profile</Button>
                    </div>
                    <div className="profile-stats">
                        <div><span style={{ fontWeight: "bold" }}>15</span> Posts</div>
                        <div><span style={{ fontWeight: "bold" }}>1M</span> folllowers</div>
                        <div><span style={{ fontWeight: "bold" }}>1</span> following</div>
                    </div>
                    <div>Hey Ya!</div>
                </div>
            </div>

            <div className="content" style={{ borderTop: "1px solid #d6d6d6" }}>
                <div className="tags">
                    <div className='tagMargin' style={{ marginRight: "1rem" }}>
                        <MovieCreationRoundedIcon sx={{ color: "gray" }} />
                        <div>REELS</div>
                    </div>
                    <div className='tagMargin' style={{ marginLeft: "1rem" }}>
                        <BookmarkBorderOutlinedIcon />
                        <div>SAVED</div>
                    </div>
                </div>
                <div className="reels">
                    <div className='reel'>
                        <Image src={pic} width="272" height="272" />
                    </div>
                    <div className='reel'>
                        <Image src={pic} width="272" height="272" />
                    </div>
                    <div className='reel'>
                        <Image src={pic} width="272" height="272" />
                    </div>
                    <div className='reel'>
                        <Image src={pic} width="272" height="272" />
                    </div>
                    <div className='reel'>
                        <Image src={pic} width="272" height="272" />
                    </div>
                    <div className='reel'>
                        <Image src={pic} width="272" height="272" />
                    </div>
                    <div className='reel'>
                        <Image src={pic} width="272" height="272" />
                    </div>
                    <div className='reel'>
                        <Image src={pic} width="272" height="272" />
                    </div>
                    <div className='reel'>
                        <Image src={pic} width="272" height="272" />
                    </div>
                    <div className='reel'>
                        <Image src={pic} width="272" height="272" />
                    </div>
                    <div className='reel'>
                        <Image src={pic} width="272" height="272" />
                    </div>
                    <div className='reel'>
                        <Image src={pic} width="272" height="272" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
