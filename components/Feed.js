import React, { useContext, useEffect } from 'react'
import Navbar from './Navbar'
import Avatar from "@mui/material/Avatar"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { AuthContext } from '../context/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import {db} from '../firebase'
import { useState } from 'react';
import { Link } from '@mui/material';


export default function Feed() {
    const {user} = useContext(AuthContext);
    const [userData, setUserData] = useState({})

    useEffect(() =>{
        console.log(user);

        //read user data from db
        const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
            console.log("Data:" , doc.data());
            setUserData(doc.data());
        });
        return () => { unsub() };
    }, [user]);
  return (
    <div className='feed-container'>
        <Navbar userData={userData}/>
        <div className="video-container">
            <div className="post-container">
                <video />
                <div className="video-info">
                    <div className="avatar-container">
                    <Avatar alt='profile' sx={{margin:"0.5rem"}} src={userData.downloadURL} />
                    <p>thissideaditya</p>
                    </div>
                    <div className="post-like">
                        <FavoriteBorderIcon sx={{color:"white"}}/>
                        <p style={{marginTop:"0.3rem", color:"white"}}>1M</p>
                    </div>
                </div>
            </div>
            <div className="post-container">
                <video />
                <div className="video-info">
                    <div className="avatar-container">
                    <Avatar alt='profile' sx={{margin:"0.5rem"}} src={userData.downloadURL} />
                    <p>thissideaditya</p>
                    </div>
                    <div className="post-like">
                        <FavoriteBorderIcon sx={{color:"white"}}/>
                        <p style={{marginTop:"0.3rem", color:"white"}}>1M</p>
                    </div>
                </div>
            </div>
            <div className="post-container">
                <video />
                <div className="video-info">
                    <div className="avatar-container">
                    <Avatar alt='profile' sx={{margin:"0.5rem"}} src={userData.downloadURL} />
                    <p>thissideaditya</p>
                    </div>
                    <div className="post-like">
                        <FavoriteBorderIcon sx={{color:"white"}}/>
                        <p style={{marginTop:"0.3rem", color:"white"}}>1M</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
