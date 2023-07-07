import styles from "./modal.module.css"
const ModalDetail = ({ click, detail, can }) => {
    return <div onClick={click} className={styles.modal}>
        <div className={styles.modal__container}>
            <div id="item" className={styles.modal__item}>
                <p>Имя Жениха {detail.groom} имя невесты {detail.bride}</p>
                <p>Дата свадьбы {detail.data.day} {detail.data.month} В {detail.data.time}</p>
                <p>Реторан: {detail.restorant}</p>
                <p>Семья: {detail.famly}</p>
                <p>Количество: {detail.quanty}</p>
                {can ? <div className={styles.order__userInfo}>
                    <p>Имя заказчика: <strong>{detail.userName}</strong></p>
                    <p>Номер заказчика: <strong>{detail.userPhone}</strong></p>
                </div> : ''}
            </div>
        </div >
    </div >
}
export default ModalDetail