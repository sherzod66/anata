import { useState } from "react"
import styles from "./auth.module.css"
import { firebaseConfig } from '../firebase-config/firebaseConfig';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, set } from "firebase/database";
import CreateUser from "./Createuser";
import SinInUser from "./SinInUser";
import { useNavigate } from "react-router-dom";
import { showLoginError } from "../ui/showLoginError";
import Errorfilled from "../ui/ErrorFileds";
import { useTranslation } from "react-i18next";


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getDatabase(app)
const objCreate = {
    name: '', email: '', phone: '', pass: ''
}
const objSign = {
    email: '', pass: ''
}
const UserAtuh = () => {
    const [vl, setValue] = useState(objCreate)
    const [sign, setSign] = useState(objSign)
    const [button, setButton] = useState(0)
    const { t, i18n } = useTranslation()
    const navigate = useNavigate()
    const sinUpBtn = async (event) => {
        event.preventDefault()
        if (vl.name.length > 0 && vl.email.length > 0 && vl.phone.length > 0 && vl.pass.length > 0) {
            await createUserWithEmailAndPassword(auth, vl.email, vl.pass)
                .then((userCredential) => {
                    const postListRef = ref(db, 'users/' + userCredential.user.uid);
                    set(postListRef, {
                        userName: vl.name,
                        phone: vl.phone,
                        orders: ''
                    })
                    setValue(objCreate)
                })
                .then(() => {
                    navigate(-1)
                })
                .catch(error => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                })
        } else {
            console.log("нет")
        }
    }
    const sinIn = (event) => {
        event.preventDefault()
        if (sign.email !== '' && sign.pass !== '') {
            signInWithEmailAndPassword(auth, sign.email, sign.pass)
                .then((userCredential) => {
                    if (userCredential.user.uid === "FX2ExaD5TGOkoXbohvygrm0SZR62") {
                        navigate('/admin')
                    } else {
                        navigate(-1)
                    }

                })
                .catch((error) => {
                    showLoginError(error)
                });
        } else {
            const errorF = document.getElementById('error-filled')
            errorF.classList.add('active')
            setTimeout(() => {
                errorF.classList.remove('active')
            }, 3000);
        }
    }

    const sinInBtn = (event) => {
        setButton(0)

    }
    const sinUp = () => {
        setButton(1)
    }


    return <main className={styles.main__auth}>
        <Errorfilled />
        <div className={styles.main__header}>
            <div className={styles.main__row}>
                <div onClick={sinInBtn} className={`${styles.login} ${button === 0 ? styles.acttion : ''}`}>{t("authSignIn")}</div>
                <div onClick={sinUp} className={`${styles.registration} ${button === 1 ? styles.acttion : ''}`}>{t("authSignUp")}</div>
            </div>
        </div>


        <div className={styles.main__container}>
            {button === 0 ?
                <SinInUser submit={sinIn} state={setSign} value={sign} />
                : <CreateUser submit={sinUpBtn} state={setValue} value={vl} />
            }
        </div>
    </main>


}
export default UserAtuh