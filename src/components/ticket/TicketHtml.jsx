import styles from './ticket.module.css'
const TicketHtml = ({ ticket, sum }) => {
    return <div className={styles.ticket__column}>
        <div className={styles.flex}>
            <p>Дата:</p>
            <p>{new Date(ticket.orderData).toLocaleDateString()}</p>
        </div>
        <div className={styles.flex}>
            <p>Время:</p>
            <p>{new Date(ticket.orderData).toLocaleTimeString()}</p>
        </div>
        <div className={styles.cardTable}>
            <ul className={styles.lis__row}>
                <li>Имя</li>
                <li>Виновники торжества</li>
                <li>Количество</li>
                <li>Время торжества</li>
                <li>Коментарий</li>
                <li>Цена</li>
            </ul>
            {ticket.cardInfo.map(el =>
                <ul key={el.cardId} className={styles.cardInfo__row}>
                    <li>{el.cardName}</li>
                    <li>{el.birthdayPeople}</li>
                    <li>{el.quanty}</li>
                    <li>{el.month} {el.date} в {el.time}</li>
                    <li>{el.comment}</li>
                    <li>{el.price}</li>
                </ul>
            )}
        </div>
        <div className={styles.flex}>
            <p>Ресторан:</p>
            <p>{ticket.restorant}</p>
        </div>
        <div className={styles.flex}>
            <p>С уважением:</p>
            <p>{ticket.famly}</p>
        </div>
        <div className={styles.flex}>
            <p>Заказ будет готов:</p>
            <p>{new Date(ticket.lastDate).toLocaleDateString()}</p>
        </div>
        <div className={styles.flex}>
            <p>Оплачено:</p>
            <p>{new Intl.NumberFormat('ru-Ru', {
                style: 'currency',
                currency: 'UZS',
            }).format(ticket.prepayment)}</p>
        </div>
        <div className={styles.flex}>
            <p>Нужно доплатить:</p>
            <p>{new Intl.NumberFormat('ru-Ru', {
                style: 'currency',
                currency: 'UZS',
            }).format(sum - +ticket.prepayment)}</p>
        </div>
        <div className={styles.flex}>
            <p>Общаяя сумма:</p>
            <p>{new Intl.NumberFormat('ru-Ru', {
                style: 'currency',
                currency: 'UZS',
            }).format(sum)}</p>
        </div>
    </div>

}
export default TicketHtml