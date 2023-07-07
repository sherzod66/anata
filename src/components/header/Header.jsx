import { Link } from "react-router-dom"
import { firebaseConfig } from '../firebase-config/firebaseConfig';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { useEffect, useState } from "react";
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const Header = ({ image }) => {
    const [us, setUser] = useState(false)
    const [admin, setAdmin] = useState(false)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(!us)
                if (user.uid === 'FX2ExaD5TGOkoXbohvygrm0SZR62') {
                    setAdmin(!admin)
                }
            } else {
                console.log("Пользовательне не найден")
            }
        })
    }, [])



    return (
        <header className="header">
            <div className="header__conatiner">
                <div className="header__row">
                    <div className="header__column">
                        <Link to={"/"}><img src={image} alt="" /></Link>
                    </div>
                    <div className="header__column">
                        {us ? admin ? <Link to={'/admin'}>Админ Панель</Link> : <Link to={'/profile'}>Профиль</Link> :
                            <Link to={'/auth'}>Зарегистрироваться</Link>
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header