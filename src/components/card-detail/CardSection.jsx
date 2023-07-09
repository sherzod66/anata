import { useState } from 'react'
import styles from './cardDetaile.module.css'
import ModalOrder from '../modal/ModalOrder'
import { firebaseConfig } from '../firebase-config/firebaseConfig';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { GetBasket, GetOnlyUser } from '../services/service';
import { getDatabase, ref } from 'firebase/database';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const CardSection = ({ card, cardId }) => {
    const [order, setOrder] = useState(false)
    const [userUid, setUserUid] = useState('')
    const [userItem, setUser] = useState('')
    const [quanty, setQuanty] = useState(1)
    const [basket, setBasket] = useState('')
    const dbRef = ref(getDatabase(app));
    const createOrder = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (+quanty >= +card.quanty + 1) {
                    alert("Количество пригласительных дожно быть меньше или равно наличии имеющихся")
                } else {
                    if (user.uid === "FX2ExaD5TGOkoXbohvygrm0SZR62") {
                        GetBasket(dbRef, user.uid, setBasket, 'admin')
                        setOrder(!order)
                        setUserUid(user.uid)
                        GetOnlyUser(dbRef, user.uid, setUser)
                        document.body.style.overflow = "hidden"
                    } else {
                        GetBasket(dbRef, user.uid, setBasket, 'users')
                        setOrder(!order)
                        setUserUid(user.uid)
                        GetOnlyUser(dbRef, user.uid, setUser)
                        document.body.style.overflow = "hidden"
                    }

                }
            } else {
                alert("Зарегистрируйтсь или войдите")
            }
        })
    }
    const getModal = (event) => {
        if (!event.target.closest('#item')) {
            document.body.style.overflow = "auto"
            setOrder(!order)
        }
    }
    const getQuanty = (event) => {
        setQuanty(event.target.value)
    }
    return (
        <>
            <section className={styles.section}>
                <div className={styles.section__container}>
                    <div className={styles.section__row}>
                        <div className={styles.section__column}>
                            <img src={card.image} alt="" />
                        </div>
                        <div className={styles.section__column}>
                            <div className={styles.section__item}>
                                <div className={styles.section__title}>{card.name}</div>
                                <div className={styles.section__orders}>{card.orders} Заказов</div>
                                <div className={styles.section__quanty}>В наличии {card.quanty} штук</div>
                                <div className={styles.section__price}>Цена <span>{new Intl.NumberFormat('ru-Ru', {
                                    style: 'currency',
                                    currency: 'UZS',
                                }).format(card.price)}</span></div>
                                <label htmlFor="quanty">Укажите колличество</label>
                                <input onChange={getQuanty} value={quanty} max={card.quanty} placeholder='50' type="number" name="number" id="quanty" />
                                <p className={styles.payment}>К оплате: {new Intl.NumberFormat('ru-Ru', {
                                    style: 'currency',
                                    currency: 'UZS',
                                }).format(card.price * quanty)}</p>
                                <button onClick={createOrder} className={styles.section__button}>Заказать</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.section__info}>
                        Описание пригласительной
                        <p>{card.description}</p>
                    </div>
                </div>
            </section>
            {order ? <ModalOrder click={getModal} basket={basket} userUid={userUid} userItem={userItem} enventation={card} cardId={cardId} quanty={quanty} /> : ''}
        </>
    )
}
export default CardSection