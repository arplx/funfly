import React, { useContext, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import logo from '../../assets/instagramLogo.png'
import Button from '@mui/material/Button';
import Link from 'next/link'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { IconButton } from '@mui/material';
import { AuthContext } from '../../context/auth';
import { useRouter } from 'next/router';
import { storage, db } from '../../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from 'firebase/firestore';

function index() {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [fullName, setFullName] = React.useState("");
    const [file, setFile] = React.useState(null);
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();
    const { signup, user } = useContext(AuthContext);


    useEffect(() => {
      if (user) {
        router.push("/");
      }
    }, [user]);

    let handleClick = async () => {
        console.log(email);
        console.log(password);
        console.log(fullName);
        console.log(file);
        try {
            setLoading(true);
            setError("");
            const userInfo = await signup(email, password);
            console.log(userInfo.user.uid);

            // Upload file and metadata to the object 'images/mountains.jpg'
            const storageRef = ref(storage, `${userInfo.user.uid}/Profile`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        console.log("File available at", downloadURL);
                        let userData = {
                            fullName,
                            email,
                            password,
                            downloadURL,
                            uid:userInfo.user.uid,
                            posts:[],
                        }

                        await setDoc(doc(db, "users", userInfo.user.uid), userData);
                        console.log("doc added to db");
                    });
                }
            );
            console.log("user signed up");

        }
        catch (err) {
            console.log("err", err);
            setError(err.code);
            // use settimeout to remove error after 2sec
            setTimeout(() => {
                setError("");
            }, 3000);
        }
        setLoading(false);

    }

    return (
        <div className="container">

            <div className='signup-container'>
                <div className="signup-card">
                    <Link href="/"><Image src={logo} /></Link>
                    <div style={{ color: "gray" }}>
                        Sign up to see photos and videos from your friends.
                    </div>
                    <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth size="small" margin='dense' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth type={"password"} margin='dense' size="small" style={{ marginTop: "0.1rem" }} value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth margin='dense' size="small" style={{ marginTop: "0.1rem" }} value={fullName} onChange={(e) => { setFullName(e.target.value) }} />
                    <Button variant="outlined" component="label" fullWidth size='small' sx={{ marginTop: "0.7rem", height: "2.3rem" }} >
                        {/* <IconButton color='primary'>
                            <CloudUploadIcon />
                        </IconButton> */}
                        Upload Profile Image
                        <input hidden accept="image/*" type="file" onChange={(e) => { setFile(e.target.files[0]) }} />
                    </Button>
                    {error != "" && <div style={{ color: "red" }}>{error}</div>}
                    <Button variant="contained" sx={{ marginTop: "0.5rem" }} fullWidth size="small" onClick={handleClick}>Sign up</Button>
                    <div className='tnc'>By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .</div>
                </div>
                <div className="bottom-card">
                    Have an account? <span style={{ color: "#4192ef" }}><Link href="/login">Log in</Link></span>
                </div>
            </div>
        </div>
    )
}

export default index