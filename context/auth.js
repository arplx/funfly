import React, { useState, useEffect } from "react";
import { auth} from "../firebase";
export const AuthContext = React.createContext();
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
function AuthWrapper({ children }) {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);

  console.log("in auth wrapper ");
    
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("onAuthStateChanged called" );
      if (user) {
        setUser(user);
      }else{
        setUser('');
      }
    })
    setLoading(false);
  },[])

  function login(email,password) {
    return signInWithEmailAndPassword(auth, email, password);
    //goes to firebase check if function called is legit
    //email pass checks with users table in authentication service 
    // if present suceess ,else fail
  }
  
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function forgot(email) {
    return sendPasswordResetEmail(auth, email);
  }

  const store = {
    login,
    user,
    logout,
    forgot,
    signup
  };

  return (
    <AuthContext.Provider value={store}>
    <div>
      { !loading && children }
    </div>
    </AuthContext.Provider>
  )
}

export default AuthWrapper
