import React, { useState } from 'react';
import {signInWithPopup, FacebookAuthProvider} from 'firebase/auth'
import { Button } from "@mui/material";
import { auth } from '../config/firebase';
import HomeScreen from '../components/HomeScreen';

function SignInWithFB() {
  const [userLoggedIn, setUserLoggedIn] = useState(true)

  const signInWithFaceBook = () =>{
    // console.log(userLoggedIn)
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
    .then((res)=>{
      console.log(res)
      setUserLoggedIn(false)
    })
    .catch((err)=>{
      console.log(err.message)
    })
  }

  const signOut = () =>{
    setUserLoggedIn(true)
    console.log(userLoggedIn)
    auth.signOut()
    console.log('signOut Successfull')
  }

  
  return (
    <div>
      {userLoggedIn?
        <div style={{flex:1,display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', backgroundColor:"grey"}}>
          <Button 
            variant="contained" 
            color="primary" size="large" 
            onClick={signInWithFaceBook}
            sx={{padding:"12px", marginTop:"18px",paddingLeft:"10px", paddingRight:"10px", width:"300px", marginRight:"10px"}} >
              Sign In With FaceBook
            </Button>
        </div>:
        <div>
          <HomeScreen/>
          <div style={{
            width:'100%',
            display:'flex',
            justifyItems:'flex-end',
            alignItems:'flex-end',
            marginLeft:'75%',
            
          }}>
          <Button 
            variant="contained" 
            color="success" size="large" 
            onClick={signOut}
            sx={{
              padding:"12px", 
              marginTop:"18px",
              paddingLeft:"10px", 
              paddingRight:"10px", 
              width:"200px", 
              marginRight:"10px",
              alignSelf:'flex-end',
              display:'flex',
              justifyItems:'flex-end',
              alignItems:'flex-end',

            }} >
              Sign Out
          </Button>
          </div>
        </div>
      }
    </div>
  )
}

export default SignInWithFB