import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail} from "firebase/auth";
export const AuthContext = React.createContext();

function AuthWrapper({children}) {

  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
    
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
  
      }
    })
    setLoading(false)
  }, [])

  function login(email, password){
    return signInWithEmailAndPassword(auth, email, password)
  }
  
  function signup(email, password, fullName){
    createUserWithEmailAndPassword(auth, email, password)
  }

  function logout(){
    signOut(auth);
  }

  function forgot(email){
    return sendPasswordResetEmail(auth, email);
  }

  const store = {
    login,
    signup,
    logout,
    forgot
  }

  return (
    <AuthContext.Provider value={store}>
    <div>
      { !loading && children }
    </div>
    </AuthContext.Provider>
  )
}

export default AuthWrapper
