import React from 'react'
import lock from '../../assets/lock.png'
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@mui/material/Button'

function index() {
  return (
    <div className='forgot-container'>
      <div className="forgot-card">
        <div className="image">
            <Image src={lock} />
        </div>
        <div style={{fontSize:"1.2rem"}}>Trouble Logging In?</div>
        <div style={{color:"gray"}}>Enter your email, phone, or username and we'll send you a link to get back into your account.</div>
        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth size="small" margin='dense' />
        <Button variant="contained" sx={{}} fullWidth size="small" >Send Login Link</Button>
        <div style={{color:"gray", paddingTop:"0.5rem"}}>OR</div>
        <div>Create New Account</div>
      </div>
      <div className="forgot-feet">
        <Link href='/login'>Back To Login</Link>
      </div>
    </div>
  )
}

export default index
