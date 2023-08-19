import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase-config/firebaseConfig";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getDatabase, ref } from "firebase/database";
import { GetUser } from "../services/service";
import UserProfileHtml from "./UserProfileHtml";
import styles from "./user.module.css"
import { AuthContext } from "../context/AuthProvider";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const UserProfile = () => {
    const [data, setData] = useState(false)
    const [orders, setOrders] = useState(false)
    const { usUid, setUsUid } = useContext(AuthContext)
    const dbRef = ref(getDatabase(app));
    const navigate = useNavigate()
    const logOut = () => {
        signOut(auth).then(() => {
            navigate(-1)
        })
            .catch((error) => console.log(error))
    }
    useEffect(() => {
        if (usUid) {
            GetUser(dbRef, setData, setOrders, `users/${usUid.uid}`)
        } else {
            console.log("Пользовательне не найден")
        }

    }, [usUid])

    return <>
        {data ? <main className={styles.usermain}>
            <div className={styles.usermain__title}><h1>Личный кабинет</h1></div>
            <div className="usermain__container">
                <div className={styles.usermain__item}>
                    <div className={styles.usermain__user}>
                        <div className={styles.usermain__avater}></div>
                        <div className={styles.usermain__infoU}>
                            <div className={styles.usermain__username}>{data.userName}</div>
                            <div className={styles.usermain__userphone}>{data.phone}</div>
                        </div>

                    </div>
                    <ul className={styles.usermain__list}>
                        <li className={styles.usermain__li}>
                            Заказы
                            <div className={styles.usermain__row}>
                                {orders ? orders.map(item => (<UserProfileHtml key={item.id} userInfo={item} />)) : <p className={styles.error}>У вас нет заказов</p>}
                            </div>

                        </li>
                        <li className={styles.usermain__li}>Связаться с нами</li>
                        <li className={styles.usermain__li}>Настройки</li>
                    </ul>
                    <button onClick={logOut} className={styles.usermain__exit} type="button">Выйти</button>
                </div>

            </div>
        </main> : <p>Загрузка...</p>}
    </>
}
export default UserProfile