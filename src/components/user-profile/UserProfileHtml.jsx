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
    const dbRef = ref(getDatabase(app));
    useEffect(() => {
        GetCardDetai(dbRef, setCard, userInfo.cardId)
    }, [])

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
            <Link to={"/card/" + userInfo.cardId} className={styles.orders__img}><img src={card.image} alt="" /></Link>
            <div className={styles.orders__body}>
                <div className={styles.orders__title}>{card.name}</div>
                <div className={styles.orders__ordersD}>Время заказа {GetData(userInfo.orderData)}</div>
                <div className={styles.orders__status}>{userInfo.status}</div>
                <div className={styles.orders__number}>№: {userInfo.id}</div>
                <div className={styles.orders__price}>{new Intl.NumberFormat('ru-Ru', {
                    style: 'currency',
                    currency: 'UZS',
                }).format(userInfo.price)}</div>
                <span onClick={detail} className={styles.orders__detaile}>Детали</span>
            </div>
        </div>
        {modal ? <ModalDetail detail={userInfo} can={false} click={getModal} /> : ''}
    </>

}
export default UserProfileHtml