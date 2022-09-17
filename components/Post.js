import { Avatar } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { db } from '../firebase';
import CommentIcon from '@mui/icons-material/Comment';

function Post({ postData, userData }) {
    console.log("data", postData);

    const [like, setLike] = useState(false);

    let handleClick = (e) => {
        e.target.muted = !e.target.muted;
    }

    useEffect(() => {
        if (postData.likes.includes(userData.uid)) {
            setLike(true);
        }
        else {
            setLike(false);
        }
    }, [postData])

    const handleLike = async () => {
        if (like) {
            await updateDoc(doc(db, "posts", postData.postId), {
                likes: arrayRemove(userData.uid),
            });
        }
        else {
            await updateDoc(doc(db, "posts", postData.postId), {
                likes: arrayUnion(userData.uid)
            })
        }
    }

    return (
        <div className="post-container">
            <video src={postData.postURL} autoPlay loop muted onClick={handleClick} />
            <div className="video-info">
                <div className="avatar-container">
                    <Link href="/profile">
                        <Avatar alt={postData.profileName} sx={{ margin: "0.5rem" }} src={postData.profilePhotoURL} />
                    </Link>
                    <Link href="/profile">
                        <p>{postData.profileName}</p>
                    </Link>
                </div>
                <div className="likeNcomm">
                    <div className="post-like">
                        <div className="like-sign" onClick={handleLike} defaultValue={like}>
                            {like ?
                                <FavoriteOutlinedIcon sx={{ color: "red" }} />
                                :
                                <FavoriteBorderIcon sx={{ color: "white" }} />
                            }
                        </div>
                        <p style={{ marginTop: "0.3rem", color: "white" }}>{postData.likes.length}</p>
                    </div>
                    <CommentIcon style={{ color: "white" }} />
                </div>
            </div>
        </div>
    )
}

export default Post