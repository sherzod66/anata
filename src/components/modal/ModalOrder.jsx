import styles from "./modal.module.css"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { FiXCircle } from "react-icons/fi";
import { AuthContext } from "../context/AuthProvider";
import ModalOrderWin from "./ModalOrderWin";
import ModalOrderStatic from "./ModalOrderStatic";
import { registerInvitation } from "../orderGetVal/registrationOrder";
const ModalOrder = ({ click, basket, userUid, cardId, enventation, userItem, quanty }) => {
    const orderInfo = {
        cardInfo: [],
        status: 'В ожидании',
        orderData: new Date().toJSON(),
        userId: userUid,
        userName: '',
        userPhone: '',
        prepayment: '',
        lastDate: '',
    }
    const { ticket, setTicket } = useContext(AuthContext)
    const [info, setInfo] = useState(orderInfo)
    const [fullPrice, setfullPrice] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        if (basket) {
            setInfo(basket)
            setInfo(prev => ({ ...prev, cardInfo: [...prev.cardInfo, { cardId: cardId, image: enventation.image, fullQuanty: +enventation.quanty, quanty: quanty, price: +enventation.price * +quanty, castPrice: enventation.castPrice, cardName: enventation.name, date: '', birthdayPeople: '', time: '', restorant: '', famly: '', lang: '' }], orderData: new Date().toJSON() }))
        } else {
            setInfo(prev => (
                {
                    ...prev,
                    cardInfo: [...prev.cardInfo, { cardId: cardId, image: enventation.image, fullQuanty: +enventation.quanty, quanty: quanty, price: +enventation.price * +quanty, castPrice: enventation.castPrice, cardName: enventation.name, date: '', birthdayPeople: '', time: '', restorant: '', famly: '', lang: '' }],
                    orderData: new Date().toJSON()
                }))
        }
    }, [basket])
    useEffect(() => {
        let price = 0
        if (info.cardInfo.length >= 1) {
            info.cardInfo.forEach(element => {
                price += +element.price;
                setfullPrice(price)
            });
        }
    }, [info])
    useEffect(() => {
        if (!userItem) return
        setInfo(prev => ({ ...prev, userName: userItem.userName, userPhone: userItem.phone }))
    }, [userItem])

    return <div onClick={click} className={styles.modal}>
        <div className={styles.modal__container}>
            <FiXCircle className={styles.remove} />
            <div id="item" className={styles.modal__item}>
                <form onSubmit={event => registerInvitation(event, info, userUid, setInfo, navigate)} className={styles.modal__form}>
                    <div className={styles.selecd__row}>
                        {info.cardInfo.length >= 1 ? info.cardInfo.map(el => (
                            <ModalOrderWin key={el.cardId} el={el} info={info} setInfo={setInfo} />
                        ))
                            : ''}
                    </div>
                    <ModalOrderStatic info={info} userUid={userUid} fullPrice={fullPrice} setInfo={setInfo} />
                </form>
            </div>
        </div >
    </div >
}
export default ModalOrder