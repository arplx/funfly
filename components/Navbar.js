import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import instagramLogo from '../assets/instagramLogo.png'
import Image from 'next/image'
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import { Link } from "@mui/material";
const settings = ["Profile", "Logout"];
import Button from '@mui/material/Button'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import AuthWrapper, { AuthContext } from "../context/auth";
import { useRouter } from "next/router";
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage, db } from "../firebase";

const ResponsiveAppBar = ({ userData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [succ, setSucc] = useState(false);
  const [progress, setProgress] = useState(0);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { logout } = React.useContext(AuthContext);
  const router = useRouter();
  const fileLimit = 50;

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file == null) {
      setError("File not selected");
      setTimeout(() => { setError('') }, 2000);
      return;
    }
    if ((file.size / (1024 * 1024)) > fileLimit) {
      setError(`File too large. Please try uploading a file less than ${fileLimit} MB`);
      setTimeout(() => { setError('') }, 2000);
      return;
    }

    let uid = uuidv4();
    setLoading(true);

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, `${userData.uid}/post/${uid}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const prog =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(prog);
        console.log("Upload is " + prog + "% done");
      },
      (error) => {
        console.log(error);
        setError(error);
        setTimeout(() => { setError('') }, 2000);
        return;
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        setLoading(false);
        setSucc(true);
        setTimeout(() => {setSucc(false)}, 2000);

        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          let postObj = {
            likes: [],
            postId: uid,
            postURL: downloadURL,
            profileName: userData.fullName,
            profilePhotoURL: userData.downloadURL,
            userId: userData.uid,
            timestamp: serverTimestamp(),
          }

          console.log("post", postObj);
          await setDoc(doc(db, "posts", uid), postObj);
          console.log("posts added to post collection");

        });
      }
    );
    console.log("Post uploaded");

  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  }

  const handleProfile = () => {
    router.push('/profile')
  }

  return (
    <AppBar position="static" className="navbar" sx={{ backgroundColor: "white" }}>
      {error != '' &&
        <Alert severity="error">{error}</Alert>
      }
      {succ &&
        <Alert severity="success">Reel uploaded</Alert>
      }
      {loading &&
        <LinearProgress className='progressBar' variant="determinate" value={progress} sx={{ mb: "0.3rem" }} />
      }
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              marginLeft: "10rem"
            }}
          >
            <Image src={instagramLogo} width={200} height={55} />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))} */}
          </Box>

          <Box sx={{ flexGrow: 0, marginRight: "10rem" }} className="nav-icons-container">
            <Link href="/"><HomeIcon fontSize="large" className="nav-icons" /></Link>
            {/* upload btn */}
            <IconButton color="primary" aria-label="upload video" component="label">
              <input hidden accept="video/*" type="file" onChange={handleChange} />
              <AddCircleOutlinedIcon fontSize="large" sx={{ color: "#000000" }} />
            </IconButton>
            <ExploreIcon fontSize="large" className="nav-icons" />
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Link href="/login"></Link>
                <Avatar
                  alt="Display Picture"
                  sx={{ margin: "0.5rem" }}
                  src={userData.downloadURL}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={() => {
                handleProfile()
                handleCloseUserMenu()
              }}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem onClick={() => {
                handleLogout()
                handleCloseUserMenu()
              }}>
                <Typography textAlign="center">Log Out</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;