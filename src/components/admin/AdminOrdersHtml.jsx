import { GetData } from "../dateOrders/dateOrders"
import styles from './adminOrders.module.css'
import { BsFillTrash2Fill } from "react-icons/bs";
import { useState } from "react"
import { useTranslation } from 'react-i18next'
import { sendStatus } from "../services/sendStatus";
const AdminOrdersHtml = ({ data, removeOrder, sum, card }) => {
    const [active, setActive] = useState(false)
    const { t, i18n } = useTranslation()
    const popap = (event) => {
        if (!active) {
            setActive(!active)
        } else if (!event.target.closest('#itemC') && !event.target.closest('#info')) {
            setActive(!active)
        }
    }
    const removeP = (event) => {
        if (event.target.closest('#order__column') && !event.target.closest('#info') && !event.target.closest('#itemC')) {
            setActive(!active)
        }
    }
    const status = (s) => {
        if (s === "В ожидании") {
            return t("statusPending")
        } else if (s === "В процессе") {
            return t("statusProgress")
        } else if (s === "Можно забирать") {
            return t("statusCan")
        } else if (s === "Забрал") {
            return t("statusTook")
        }

    }
    return <div onClick={removeP} id="order__column" className={`${styles.order__column} ${active ? styles.active : ''}`}>
        <div onClick={popap} className={styles.order__item}>
            {data.cardInfo ?
                <div id='info' className={styles.order__itemInfo}>
                    <div className={styles.order__itemInfoColumn}>
                        <div className={styles.order__itemInfoDate}>{t("adminOrderTime")}: {GetData(data.orderData)}</div>
                        <div id="status" className={styles.order__status}>{status(data.status)}</div>
                        <select onChange={(event) => sendStatus(event, data, sum, card)} name="satus" id="satus">
                            <option value="В ожидании">{t("statusPending")}</option>
                            <option value="В процессе">{t("statusProgress")}</option>
                            <option value="Можно забирать">{t("statusCan")}</option>
                            <option value="Забрал">{t("statusTook")}</option>
                        </select>
                        <div className={styles.order__itemInfoRestorant}>{t("adminOrderMust")}: {new Date(data.lastDate).toLocaleDateString()}</div>
                        <div className={styles.order__prepayment}>{t("adminPaid")}: {new Intl.NumberFormat('ru-Ru', { style: 'currency', currency: 'UZS', }).format(data.prepayment)}</div>
                        <div className={styles.order__neeed}>{t("adminNeedPaid")}: {new Intl.NumberFormat('ru-Ru', { style: 'currency', currency: 'UZS', }).format(sum - +data.prepayment)}</div>
                        <div className={styles.order__price}>{t("adminOrderTotal")}: {new Intl.NumberFormat('ru-Ru', { style: 'currency', currency: 'UZS', }).format(sum)}</div></div>
                    <div className={styles.order__itemInfoColumn}><p>{t("clientName")}: <strong>{data.userName}</strong></p><p>{t("customerNumber")}: <strong>{data.userPhone}</strong></p>
                    </div>
                    <div className={styles.order__itemInfoColumn}>
                        <div onClick={removeOrder} className={`${styles.remove__order} ${data.status === 'В ожидании' ? styles.active : ''}`}><BsFillTrash2Fill />
                        </div>
                    </div>
                </div> : ''}
            <div className={styles.order__row}>
                {data.cardInfo ?
                    data.cardInfo.map(item => (
                        <div id="itemC" key={item.cardId} className={styles.order__rowColumn}>
                            <div className={styles.order__rowImg}><img data-src={item.image} src="https://www.erdemdavetiye.com/images/resim-yoktur.jpg" alt="image" /></div>
                            <div className={styles.order__info}>
                                <div id="nameP" className={styles.order__rowNameP}>{item.birthdayPeople}</div>
                                <div className={styles.order__restorant}><strong>{t("restorant")}:</strong> {item.restorant}</div>
                                <div className={styles.order__famly}><strong>{t('sincerely')}:</strong> {item.famly}</div>
                                <div className={styles.order__rowQunaty}><strong>{t("quanty")}:</strong> {item.quanty}</div>
                                <div className={styles.order__rowQunaty}><strong>{t("time")}:</strong> {item.date} в {item.time}</div>
                                <div className={styles.order__itemInfoColumn}>
                                    <div className={styles.comment__user}><strong>{t("comment")}:</strong> <p>{item.comment}</p></div>
                                </div>
                                <div className={styles.order__rowPrice}><strong>{t("price")}:</strong> {new Intl.NumberFormat('ru-Ru', {
                                    style: 'currency',
                                    currency: 'UZS',
                                }).format(item.price)}</div>
                            </div>

                        </div>
                    )) : ''
                }
            </div>
        </div>
        <p id="order__id" className={styles.order__id}>{data.cardInfo ? data.cardInfo[0].birthdayPeople : ""}</p>
    </div>
}
export default AdminOrdersHtml