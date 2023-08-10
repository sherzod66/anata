import { GetData } from "../dateOrders/dateOrders"
import styles from "./modalDetaile.module.css"
const ModalDetail = ({ detail, click, sum }) => {
    console.log(detail)
    return <div onClick={click} className={styles.modal}>
        <div id="item" className={styles.modalDetail__container}>
            <div className={styles.modalDetail__info}>
                <div className={styles.modalDetailI__column}>
                    <div className={styles.modalDetail__itemInfoDate}>Вермя заказа: {GetData(detail.orderData)}</div>
                    <div className={styles.modalDetail__itemInfoRestorant}>Заказ должен быть готов: {new Date(detail.lastDate).toLocaleDateString()}</div>
                    <div className={styles.modalDetail__prepayment}>Оплачено: {new Intl.NumberFormat('ru-Ru', {
                        style: 'currency',
                        currency: 'UZS',
                    }).format(detail.prepayment)}</div>
                    <div className={styles.modalDetail__neeed}>Нужно доплатить: {new Intl.NumberFormat('ru-Ru', {
                        style: 'currency',
                        currency: 'UZS',
                    }).format(sum - +detail.prepayment)}</div>
                    <div className={styles.modalDetail__price}>Общаяя сумма заказа {new Intl.NumberFormat('ru-Ru', {
                        style: 'currency',
                        currency: 'UZS',
                    }).format(sum)}</div>
                </div>
            </div>
            <div className={styles.modalDetail__row}>
                {detail.cardInfo ? detail.cardInfo.map(item => (
                    <div key={item.cardId} className={styles.modalDetail__column}>
                        <div className={styles.modalDetail__item}>
                            <div className={styles.modalDetail__img}><img src={item.image} alt="" /></div>
                            <div className={styles.modalDetail__body}>
                                <div id="nameP" className={styles.modalDetail__rowNameP}>{item.birthdayPeople}</div>
                                <div className={styles.modalDetail__rowQunaty}>Ресторан: {item.restorant}</div>
                                <div className={styles.modalDetail__rowQunaty}>С уважением: {item.famly}</div>
                                <div className={styles.modalDetail__rowQunaty}>Количество: {item.quanty}</div>
                                <div className={styles.modalDetail__rowQunaty}>{item.date} в {item.time}</div>
                                <div className={styles.modalDetail__itemInfoColumn}>
                                    <div className={styles.comment__user}>Коментарий: <p>{item.comment}</p></div>
                                </div>
                                <div className={styles.modalDetail__rowPrice}>Цена: {new Intl.NumberFormat('ru-Ru', {
                                    style: 'currency',
                                    currency: 'UZS',
                                }).format(item.price)}</div>
                            </div>
                        </div>
                    </div>
                )) : ''}
            </div>
        </div>
    </div >
}
export default ModalDetail