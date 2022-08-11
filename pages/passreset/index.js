import React, { useContext, useState } from 'react'
import lock from '../../assets/lock.png'
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@mui/material/Button'
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/auth';
import { async } from '@firebase/util';

function index() {
  const router = useRouter();
  const {forgot} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [msg, setMSG] = useState('');

  const handleClick = async() =>{
    try {
      console.log(email);
      setLoading(true)
      setEmail('');
      await forgot(email);
      console.log("link sent")
      setMSG('Link Sent')
    } catch (err) {
      console.log("error", JSON.stringify(err));
      setError(err.code);
      setTimeout(() => {
        setError('');
      }, 4000);
    }
    setLoading(false);
  }
  return (
    <div className='forgot-container'>
      <div className="forgot-card">
        <div className="image">
            <Image src={lock} />
        </div>
        <div style={{fontSize:"1.2rem"}}>Trouble Logging In?</div>
        <div style={{color:"gray"}}>Enter your email, phone, or username and we'll send you a link to get back into your account.</div>
        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth size="small" margin='dense' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
        {
        msg != "" && <div style={{color:"#ccc"}}>{ msg }</div>
        }
        {
        error != "" && <div style={{color:"red"}}>{ error }</div>
        }
        <Button variant="contained" sx={{}} fullWidth size="small" onClick={handleClick} disabled={loading}>Send Login Link</Button>
        <div style={{color:"gray", paddingTop:"0.5rem"}}>OR</div>
        <Link href="/signup">Create New Account</Link>
      </div>
      <div className="forgot-feet">
        <Link href='/login'>Back To Login</Link>
      </div>
    </div>
  )
}

export default index
