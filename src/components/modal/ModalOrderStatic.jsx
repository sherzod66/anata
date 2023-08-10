import styles from "./modal.module.css"
import { AiFillFileText } from "react-icons/ai";
import { addEnventetion, getTicket, removeEnventetion } from "../orderGetVal/registrationOrder";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { GetDataLast } from "../dateOrders/dateOrders";
const ModalOrderStatic = ({ info, userUid, fullPrice, setInfo }) => {
    const navigate = useNavigate()
    const { t, i18n } = useTranslation()
    return <div className={styles.general__info}>
        <label htmlFor="las-data">{t("orderMust")}</label>
        <input type="date" onChange={event => setInfo(prev => ({ ...prev, lastDate: Date.parse(event.target.value) }))} value={info.lastDate !== '' ? GetDataLast(info.lastDate) : ""} name="restorant-name" id={styles.last__data} />
        {userUid === 'FX2ExaD5TGOkoXbohvygrm0SZR62' ?
            <>
                <label htmlFor="restorant">{t("clientName")}</label>
                <input type="text" onChange={event => setInfo(prev => ({ ...prev, userName: event.target.value }))} value={info.userName} name="user-name" className={styles.restorant} />
                <label htmlFor="restorant">{t("customerNumber")}</label>
                <input type="tel" onChange={event => setInfo(prev => ({ ...prev, userPhone: event.target.value }))} value={info.userPhone} name="phone" className={styles.restorant} />
                <label htmlFor="restorant">{t("prepayment")}</label>
                <input placeholder={new Intl.NumberFormat('ru-Ru', { style: 'currency', currency: 'UZS', }).format(fullPrice / 2)} type="number" onChange={event => setInfo(prev => ({ ...prev, prepayment: event.target.value }))} value={info.prepayment} name="prepayment" className={styles.restorant} />
                <AiFillFileText onClick={() => getTicket(userUid, info)} className={styles.ticket} />
            </>
            : ''
        }
        {fullPrice === '' ? ''
            : < p className={styles.price__text}>{t("fullQuanty")}: <span >{new Intl.NumberFormat('ru-Ru', {
                style: 'currency',
                currency: 'UZS',
            }).format(+fullPrice)}</span></p>}
        <button onClick={() => addEnventetion(userUid, info, navigate)} className={styles.btn} type="button">{t("SupplementOrder")}</button>
        <button className={styles.btn} type="submit">{t("order")}</button>
        {info.cardInfo.length > 1 ?
            <button onClick={() => removeEnventetion(userUid, navigate, setInfo)} className={styles.btnRed} type="button">{t("clear")}</button>
            : ''}
        <br />
        <br />
        <br />
        <br />
    </div>
}
export default ModalOrderStatic