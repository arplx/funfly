import React from 'react'
import Profile from '../../components/Profile'
import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";


function index() {
  const { user } = useContext(AuthContext);

  const Redirect = () => {
    const router = useRouter();
    router.push('/login');
    return null;
  }
  return (
    <>
      {user?.uid ? <Profile/> : <Redirect/>}
    </>
  )
}

export default index
