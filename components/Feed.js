import React, { useContext, useEffect } from 'react'
import Navbar from './Navbar'
import { AuthContext } from '../context/auth';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import {db} from '../firebase'
import { useState } from 'react';
import Post from './Post';


export default function Feed() {
    const {user} = useContext(AuthContext);
    const [userData, setUserData] = useState({})
    const [posts, setPosts] = useState([]);

    useEffect(() =>{
        console.log(user);

        //read user data from db
        const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
            console.log("Data:" , doc.data());
            setUserData(doc.data());
        });
        return () => { unsub() };
    }, [user]);

    // get posts from db
    useEffect(() =>{
        console.log(user);

        //read user data from db
        const unsub = onSnapshot(query(collection(db, "posts"), orderBy("timestamp", "desc")), (snapshot) => {
            let tempArr = [];
            snapshot.docs.map(doc=>tempArr.push(doc.data()))

            setPosts([...tempArr]);
        });
        return () => { unsub() };
    }, []);

  return (
    <div className='feed-container'>
        <Navbar userData={userData} />
        <div className="video-container">
            {
                posts.map((post) => <Post postData={post} userData = {user}/>)
            }
        </div>
    </div>
  )
}
