import React from 'react'
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import logo from '../../assets/instagramLogo.png'
import Button from '@mui/material/Button';


function index() {
    return (
        <div className='signup-container'>
            <div className="signup-card">
                <Image src={logo} />
                <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth size="small" margin='dense' />
                <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth type={"password"} margin='dense' size="small" />
                <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth margin='dense' size="small" />
                <Button variant="contained" sx={{ marginTop:"5px"}} fullWidth size="small" >Login</Button>
                <Button variant="contained" component="label" fullWidth size='small' sx={{ marginTop:"8px" }} >
                    Upload
                    <input hidden accept="image/*" multiple type="file" />
                </Button>
            </div>
        </div>
    )
}

export default index