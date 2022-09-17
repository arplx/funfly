import { Avatar, Button } from '@mui/material'
import React from 'react'
import Navbar from '../components/Navbar'
import MovieCreationRoundedIcon from '@mui/icons-material/MovieCreationRounded';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import pic from '../assets/pic.jpeg'
import Image from 'next/image';
import { useContext } from 'react';
import { AuthContext } from '../context/auth';
import { useState } from 'react';
import { useEffect } from 'react';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import Post from './Post';

function Profile() {
    const { user } = useContext(AuthContext)
    const [userData, setUserData] = useState({})
    const [postIds, setPostIds] = useState([])
    const [userPosts, setUserPosts] = useState([])

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
            setUserData(doc.data());
            setPostIds(doc.data().posts);
        });
        return () => {
            unsub();
        };
    }, [user]);

    // get posts from db
    useEffect(() => {
        let tempArr = [];
        postIds.map(pid => {
          const unsub = onSnapshot(doc(db, "posts", pid), (doc) => {
            tempArr.push(doc.data());
            setUserPosts([...tempArr]);
            console.log("hello",tempArr);
          });
        })
      }, [postIds]);
    

    return (
        <div className='profile-container'>
            <Navbar userData={userData} />
            <div className="profile-details" >
                <div className="dp">
                    <Avatar sx={{ width: "10rem", height: "10rem" }} src={userData.downloadURL} />
                </div>
                <div className="details">
                    <div className="profile-username">
                        <div style={{ fontSize: "28px", fontWeight: "250" }}>{userData.fullName}</div>
                        <Button variant='outlined' sx={{ marginLeft: "1rem" }}>Edit profile</Button>
                    </div>
                    <div className="profile-stats">
                        <div><span style={{ fontWeight: "bold" }}>{userData.posts?.length}</span> Posts</div>
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
                {
                userPosts.map((post) => <video className='reel' src={post.postURL} autoPlay loop muted/>)
            }
                </div>
            </div>
        </div>
    )
}

export default Profile
