import { useState } from "react"
import styles from "./auth.module.css"
import { firebaseConfig } from '../firebase-config/firebaseConfig';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, set } from "firebase/database";
import CreateUser from "./Createuser";
import SinInUser from "./SinInUser";
import { useNavigate } from "react-router-dom";


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

        signInWithEmailAndPassword(auth, sign.email, sign.pass)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
                if (userCredential.user.uid === "FX2ExaD5TGOkoXbohvygrm0SZR62") {
                    navigate('/admin')
                } else {
                    navigate(-1)
                }

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    const sinInBtn = (event) => {
        setButton(0)

    }
    const sinUp = () => {
        setButton(1)
    }


    return <main className={styles.main__auth}>
        <div className={styles.main__header}>
            <div className={styles.main__row}>
                <div onClick={sinInBtn} className={styles.login}>Войти</div>
                <div onClick={sinUp} className={styles.registration}>Зарегистрироваться</div>
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