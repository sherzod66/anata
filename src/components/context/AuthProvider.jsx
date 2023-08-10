import { initializeApp } from "firebase/app";
import { createContext, useEffect, useState } from "react";
import { firebaseConfig } from "../firebase-config/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext()
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const AuthProvider = ({ children }) => {
    const [us, setUser] = useState(false)
    const [admin, setAdmin] = useState(false)
    const [usUid, setUsUid] = useState(null)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(!us)
                setUsUid(user)
                if (user.uid === 'FX2ExaD5TGOkoXbohvygrm0SZR62') {
                    setAdmin(!admin)
                    setUsUid(user)
                }
            } else {
                setUser(false)
                setAdmin(false)
                setUsUid(null)
            }
        })
    }, [])
    return <AuthContext.Provider value={{ us, setUser, admin, setAdmin, usUid, setUsUid }}>{children}</AuthContext.Provider>
}

export default AuthProvider