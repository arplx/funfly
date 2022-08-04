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
                <div style={{color: "gray"}}>
                Sign up to see photos and videos from your friends.
                </div>
                <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth size="small" margin='dense' />
                <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth type={"password"} margin='dense' size="small" />
                <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth margin='dense' size="small" />
                <Button variant="outlined" component="label" fullWidth size='small' sx={{ marginTop:"8px" }} >
                    {/* <IconButton>
                        <CloudUploadIcon />
                    </IconButton> */}
                    Upload Profile Image
                    <input hidden accept="image/*" multiple type="file" />
                </Button>
                <Button variant="contained" sx={{ marginTop:"5px"}} fullWidth size="small" >Sign up</Button>
                <div className='tnc'>By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .</div>
            </div>
            <div className="bottom-card">
                Have an account? <span style={{color:"blue"}}>Log in</span>
            </div>
        </div>
    )
}

export default index