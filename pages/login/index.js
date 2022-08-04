import React from 'react'
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import logo from '../../assets/instagramLogo.png'
import Button from '@mui/material/Button';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import Icon from '@mui/material/Icon';
// import { IconButton } from '@mui/material';


function index() {
    return (
        <div className='signup-container'>
            <div className="signup-card">
                <Image src={logo} />
                <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth size="small" margin='dense' />
                <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth type={"password"} margin='dense' size="small" style={{marginTop:"0.1rem"}} />
                <Button variant="contained" sx={{ marginTop:"1rem"}} fullWidth size="small" >Login</Button>
                <div style={{color:"gray", marginTop:"1rem"}}>OR</div>
                <div style={{color:"#1f3f6e", marginTop:"1rem"}}>Forgot password?</div>
            </div>
            <div className="bottom-card">
                Don't have an account? <span style={{color:"#4192ef"}}>Sign up</span>
            </div>
        </div>
    )
}

export default index