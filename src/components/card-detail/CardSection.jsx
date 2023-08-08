import { useContext, useState } from 'react'
import styles from './cardDetaile.module.css'
import ModalOrder from '../modal/ModalOrder'
import { firebaseConfig } from '../firebase-config/firebaseConfig';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { GetBasket, GetOnlyUser } from '../services/service';
import { getDatabase, ref } from 'firebase/database';
import { AuthContext } from '../context/AuthProvider';
import { useTranslation } from 'react-i18next';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const CardSection = ({ card, cardId }) => {
    const { us, setUser } = useContext(AuthContext)
    const { usUid, setUsUid } = useContext(AuthContext)
    const [order, setOrder] = useState(false)
    const [userItem, setUser1] = useState('')
    const [quanty, setQuanty] = useState(1)
    const [basket, setBasket] = useState('')
    const { t, i18n } = useTranslation()
    const dbRef = ref(getDatabase(app));
    const createOrder = () => {
        if (us) {
            if (+quanty >= +card.quanty + 1) {
                alert("Количество пригласительных дожно быть меньше или равно наличии имеющихся")
            } else {
                if (usUid.uid === "FX2ExaD5TGOkoXbohvygrm0SZR62") {
                    GetBasket(dbRef, usUid.uid, setBasket, 'admin')
                    setOrder(!order)
                    GetOnlyUser(dbRef, usUid.uid, setUser1)
                    document.body.style.overflow = "hidden"
                } else {
                    GetBasket(dbRef, usUid.uid, setBasket, 'users')
                    setOrder(!order)
                    GetOnlyUser(dbRef, usUid.uid, setUser1)
                    document.body.style.overflow = "hidden"
                }
            }
        } else {
            alert("Зарегистрируйтсь или войдите")
        }
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
    console.log(quanty)
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
                                <div className={styles.section__orders}>{card.orders} {t("orders")}</div>
                                <div className={styles.section__quanty}>{t("inStock")} {card.quanty} {t("pieces")}</div>
                                <div className={styles.section__price}>{t("price")} <span>{new Intl.NumberFormat('ru-Ru', {
                                    style: 'currency',
                                    currency: 'UZS',
                                }).format(card.price)}</span></div>
                                <label htmlFor="quanty">{t("specifyQuantity")}</label>
                                <input onChange={getQuanty} value={quanty} max={card.quanty} placeholder='50' type="number" name="number" id="quanty" />
                                <p className={styles.payment}>{t("topay")}: {new Intl.NumberFormat('ru-Ru', {
                                    style: 'currency',
                                    currency: 'UZS',
                                }).format(card.price * quanty)}</p>
                                <button onClick={createOrder} className={styles.section__button}>{t("order")}</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.section__info}>
                        {t("description")}
                        <p>{card.description}</p>
                    </div>
                </div>
            </section>
            {order ? <ModalOrder click={getModal} basket={basket} userUid={usUid.uid} userItem={userItem} enventation={card} cardId={cardId} quanty={quanty} /> : ''}
        </>
    )
}
export default CardSection