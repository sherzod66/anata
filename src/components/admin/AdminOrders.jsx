import { useEffect, useState } from "react"
import styles from './adminOrders.module.css'
//import "./admin.css"
import { GetCardDetai } from "../services/service"
import { getDatabase, ref, update } from "firebase/database";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase-config/firebaseConfig";
import { GetData, GetDataUidLast } from "../dateOrders/dateOrders";
import ModalDetail from "../modal/ModalDetail";


const app = initializeApp(firebaseConfig);

const AdminOrders = ({ data }) => {
    const [card, useCard] = useState(false)
    const [modal, setModal] = useState('')
    const [active, setActive] = useState(false)
    const [sum, setSume] = useState('')
    const dbRef = ref(getDatabase(app));
    useEffect(() => {
        GetCardDetai(dbRef, useCard, data.cardId)
    }, [])
    useEffect(() => {
        if (data.cardInfo) {
            let s = 0
            for (let index = 0; index < data.cardInfo.length; index++) {
                s += +data.cardInfo[index].price;
                setSume(s)
            }
        }
    }, [data])
    const sendStatus = (event) => {
        console.log("Hf,jnft")
        const updates = {};
        if (data.userId === 'FX2ExaD5TGOkoXbohvygrm0SZR62') {
            if (event.target.value === 'Забрал') {
                updates[`orders/${data.id}/status`] = event.target.value;
                updates[`orders/${data.id}/prepayment`] = +data.prepayment + (+data.price - +data.prepayment);
                updates[`cards/${data.cardId}/orders`] = card.orders + 1;
                updates[`report/${GetDataUidLast(data.orderData)}/${data.id}/prepayment`] = +data.prepayment + (+data.price - +data.prepayment);
                update(dbRef, updates).then(() => {
                    console.log("Получилось!")
                })
            } else {
                updates[`orders/${data.id}/status`] = event.target.value;
                update(dbRef, updates).then(() => {
                    console.log("Получилось!")
                })
            }

        } else {
            if (event.target.value === 'Забрал') {
                updates[`users/${data.userId}/orders/${data.id}/status`] = event.target.value;
                updates[`orders/${data.id}/status`] = event.target.value;
                updates[`orders/${data.id}/prepayment`] = +data.prepayment + (+data.price - +data.prepayment);
                updates[`cards/${data.cardId}/orders`] = card.orders + 1;
                updates[`report/${GetDataUidLast(data.orderData)}/${data.id}/prepayment`] = +data.prepayment + (+data.price - +data.prepayment);
                update(dbRef, updates).then(() => {
                    console.log("Получилось!")
                })
            } else {
                updates[`users/${data.userId}/orders/${data.id}/status`] = event.target.value;
                updates[`orders/${data.id}/status`] = event.target.value;
                update(dbRef, updates).then(() => {
                    console.log("Получилось!")
                })
            }
        }

    }
    console.log(data)
    const detail = (event) => {
        setModal(!modal)
    }
    const getModal = (event) => {
        if (!event.target.closest('#item')) {
            document.body.style.overflow = "auto"
            setModal(!modal)
        }
    }
    const popap = (event) => {
        if (!event.target.closest('.order__row-column') && !event.target.closest('.order__itemInfo')) {
            setActive(!active)
        }
    }

    return <div className={`${styles.order__column} ${active ? styles.active : ''}`}>
        <div onClick={popap} className={styles.order__item}>
            {data.data ?
                <div className={styles.order__itemInfo}>
                    <div className={styles.order__itemInfoColumn}>
                        <div className={styles.order__itemInfoDate}>Вермя заказа: {GetData(data.orderData)}</div>
                        <div className={styles.order__itemInfoQunaty}>Дата свадьбы: {data.data.day} {data.data.month} В {data.data.time}</div>
                        <div className={styles.order__itemInfoFamly}>С уважением: {data.famly}</div>
                        <div className={styles.order__itemInfoRestorant}>Ресторан: {data.restorant}</div>
                        <div className={styles.order__status}>
                            {data.status}
                        </div>
                        <select onChange={sendStatus} name="satus" id="satus">
                            <option value="В ожидании">В ожидании</option>
                            <option value="В процессе">В процессе</option>
                            <option value="Можно забирать">Можно забирать</option>
                            <option value="Забрал">Забрал</option>
                        </select>
                        <div className={styles.order__prepayment}>Оплачено: {new Intl.NumberFormat('ru-Ru', {
                            style: 'currency',
                            currency: 'UZS',
                        }).format(data.prepayment)}</div>
                        <div className={styles.order__neeed}>Нужно доплатить: {new Intl.NumberFormat('ru-Ru', {
                            style: 'currency',
                            currency: 'UZS',
                        }).format(sum - +data.prepayment)}</div>
                        <div className={styles.order__price}>Общаяя сумма заказа {new Intl.NumberFormat('ru-Ru', {
                            style: 'currency',
                            currency: 'UZS',
                        }).format(sum)}</div>
                    </div>
                    <div className={styles.order__itemInfoColumn}>
                        <p>Имя заказчика: <strong>{data.userName}</strong></p>
                        <p>Номер заказчика: <strong>{data.userPhone}</strong></p>
                    </div>
                </div> : ''
            }
            <div className={styles.order__row}>
                {data.cardInfo ?
                    data.cardInfo.map(item => (
                        <div key={item.cardId} className={styles.order__rowColumn}>
                            <div className={styles.order__rowImg}><img src={item.image} alt="image" /></div>
                            <div className={styles.order__info}>
                                <div className={styles.order__rowNameP}>{item.birthdayPeople}</div>
                                <div className={styles.order__rowQunaty}>Количество: {item.quanty}</div>
                                <div className={styles.order__rowPrice}>Цена: {new Intl.NumberFormat('ru-Ru', {
                                    style: 'currency',
                                    currency: 'UZS',
                                }).format(item.price)}</div>
                            </div>

                        </div>
                    )) : ''
                }
            </div>
        </div>
        <p className={styles.order__id}>ID: {data.id}</p>
    </div>


}
export default AdminOrders
//{modal ? <ModalDetail detail={data} can={true} click={getModal} /> : ''}
{/*<div className={styles.order__img"><img src={card.image} alt="" /></div>
<div className={styles.order__body">
    <div className={styles.order__title">{data.groom} и {data.bride}</div>
    <div className={styles.order__date">{GetData(data.orderData)}</div>
    <div className={styles.order__status">
        {data.status}
    </div>
    <select onChange={sendStatus} name="satus" id="satus">
        <option value="В ожидании">В ожидании</option>
        <option value="В процессе">В процессе</option>
        <option value="Можно забирать">Можно забирать</option>
        <option value="Забрал">Забрал</option>
    </select>
    <div className={styles.orders__number">№: {data.id}</div>
    <div className={styles.order__prepayment">Оплачено: {new Intl.NumberFormat('ru-Ru', {
        style: 'currency',
        currency: 'UZS',
    }).format(data.prepayment)}</div>
    <div className={styles.order__neeed">Нужно доплатить: {new Intl.NumberFormat('ru-Ru', {
        style: 'currency',
        currency: 'UZS',
    }).format(data.price - data.prepayment)}</div>
    <div className={styles.order__price">{new Intl.NumberFormat('ru-Ru', {
        style: 'currency',
        currency: 'UZS',
    }).format(data.price)}</div>
    <span onClick={detail} className={styles.orders__detaile">Детали</span>
</div>*/}