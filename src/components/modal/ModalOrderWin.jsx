import styles from "./modal.module.css"
import { getCommentValue, getDateValue, getFamlyValue, getLangValue, getNameValue, getRestorantValue, getTimeValue } from "../orderGetVal/orderGetVal";
import { useTranslation } from "react-i18next";
const ModalOrderWin = ({ el, info, setInfo }) => {
    const { t, i18n } = useTranslation()
    return <div className={styles.form__column}>
        <div className={styles.form__item}>
            <p className={styles.selecd__text}>{t("selectedI")}</p>
            <div className={styles.order__info}>
                <div className={styles.selecd__img}><img src={el.image} alt="" /></div>
                <p className={styles.quanty}>{t("quanty")}: {el.quanty}</p>
            </div>
            <label htmlFor="">{t("inLang")}:</label>
            <span className={styles.radio} ><input id={el.cardId} onChange={(event) => getLangValue(event, info, setInfo)} type="radio" name={el.cardId} value='ru' /> РУ</span>
            <span className={styles.radio} ><input id={el.cardId} onChange={(event) => getLangValue(event, info, setInfo)} type="radio" name={el.cardId} value='uz' /> UZ</span>
            <span className={styles.radio} ><input id={el.cardId} onChange={(event) => getLangValue(event, info, setInfo)} type="radio" name={el.cardId} value='en' /> EN</span>


            <label htmlFor="groom">{t("birthdayPeople")}</label>
            <input className={styles.groom} id={el.cardId} placeholder="Саша и Таня" onChange={(event) => getNameValue(event, info, setInfo)} value={el.birthdayPeople} type="text" name="name" />
            <label htmlFor="data">{t("dateAndTime")}</label>
            <div className={styles.data}>
                <p><input className={styles.dataMonth} id={el.cardId} onChange={(event) => getDateValue(event, info, setInfo)} value={el.date} type="date" /></p>
                <p><label htmlFor="time">{t("time")}</label>
                    <input id={el.cardId} placeholder="18:00" onChange={(event) => getTimeValue(event, info, setInfo)} value={el.time} type="time" name="time" className={styles.time} /></p>

            </div>
            <label htmlFor="restorant">{t("nRestorant")}</label>
            <input id={el.cardId} type="text" onChange={(event) => getRestorantValue(event, info, setInfo)} value={el.restorant} name="restorant-name" className={styles.restorant} />

            <label htmlFor="famly">{t("sincerely")}</label>
            <input id={el.cardId} type="text" onChange={(event => getFamlyValue(event, info, setInfo))} value={el.famly} name="famly" className={styles.famly} />
            <label htmlFor="restorant">{t("comment")}</label>
            <textarea className={styles.comment} placeholder="Пригласительное должно быть готово уже через 2 дня" type="text" onChange={(event) => getCommentValue(event, info, setInfo)} value={el.comment} name="komment" id={el.cardId} />
        </div>
    </div>
}
export default ModalOrderWin