import React from 'react'
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import logo from '../../assets/instagramLogo.png'
import Button from '@mui/material/Button';
import Link from 'next/link'
import { Carousel } from 'react-responsive-carousel';
import bg1 from '../../assets/bg1.jpeg'
import bg2 from '../../assets/bg2.jpeg'
import bg3 from '../../assets/bg3.jpeg'
import bg4 from '../../assets/bg4.jpeg'


function index() {
  return (
    <div className='login-container'>
      <div className="instaMobImg">
        <div className="carousel">
          <Carousel autoPlay infiniteLoop interval="2000" stopOnHover showArrows={false} showIndicators={false} showStatus={false}>
            <Image src={bg1} />
            <Image src={bg2} />
            <Image src={bg3} />
            <Image src={bg4} />
          </Carousel>
        </div>
      </div>

      <div className='parent-card'>
        <div className="login-card">
          <div className='login-new-card'>
            <Link href="/"><Image src={logo} /></Link>
            <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth size="small" margin='dense' />
            <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth type={"password"} margin='dense' size="small" style={{marginTop:"0rem"}} />
            <Button variant="contained" sx={{}} fullWidth size="small" >Login</Button>
            <div style={{ color: "gray" }}>OR</div>
            <div style={{ color: "#1f3f6e" }}>
              <Link href="/passreset">Forgot password?</Link>
              </div>
          </div>
        </div>

        <div className="bottom-login-card">
          Don't have an account? <span style={{ color: "#4192ef" }}><Link href="/signup">Sign up</Link></span>
        </div>
      </div>
    </div>
  )
}

export default index