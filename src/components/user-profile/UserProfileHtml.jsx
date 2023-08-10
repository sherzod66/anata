import { useEffect, useState } from "react"
import styles from "./user.module.css"
import { GetCardDetai } from "../services/service"
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import { firebaseConfig } from "../firebase-config/firebaseConfig";
import { Link } from "react-router-dom";
import { GetData } from "../dateOrders/dateOrders";
import ModalDetail from "../modal/ModalDetail";
const app = initializeApp(firebaseConfig);


const UserProfileHtml = ({ userInfo }) => {
    const [card, setCard] = useState('')
    const [modal, setModal] = useState(false)
    const [sum, setSum] = useState(null)
    const dbRef = ref(getDatabase(app));
    useEffect(() => {
        GetCardDetai(dbRef, setCard, userInfo.cardId)

    }, [])
    useEffect(() => {
        if (userInfo.cardInfo) {
            let s = 0
            for (let index = 0; index < userInfo.cardInfo.length; index++) {
                s += +userInfo.cardInfo[index].price;
                setSum(s)
            }
        }
    }, [userInfo])

    const detail = (event) => {
        setModal(!modal)
    }
    const getModal = (event) => {
        if (!event.target.closest('#item')) {
            document.body.style.overflow = "auto"
            setModal(!modal)
        }
    }
    return <>
        <div className={styles.orders__item}>
            <div className={styles.orders__row}>
                {userInfo.cardInfo ? userInfo.cardInfo.map(el => (
                    <div key={el.cardId} className={styles.oredr__column}>
                        <Link to={"/card/" + el.cardId} className={styles.orders__img}><img src={el.image} alt="" /></Link>
                    </div>
                )) : ''}
            </div>
            <div className={styles.orders__body}>
                <div className={styles.orders__title}>{card.name}</div>
                <div className={styles.orders__ordersD}>Время заказа {GetData(userInfo.orderData)}</div>
                <div className={styles.orders__status}>{userInfo.status}</div>
                <div className={styles.orders__number}>№: {userInfo.id}</div>
                <div className={styles.orders__price}>{new Intl.NumberFormat('ru-Ru', {
                    style: 'currency',
                    currency: 'UZS',
                }).format(sum)}</div>
                <span onClick={detail} className={styles.orders__detaile}>Детали</span>
            </div>
        </div>
        {modal ? <ModalDetail detail={userInfo} click={getModal} sum={sum} /> : ''}
    </>

}
export default UserProfileHtml