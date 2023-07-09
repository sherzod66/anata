
import styles from "./modal.module.css"
import { useEffect, useState } from "react"
import { initializeApp } from "firebase/app";
import { getDatabase, ref, remove, update } from "firebase/database"
import { firebaseConfig } from "../firebase-config/firebaseConfig";
import { GetCardUid, GetDataUid } from "../dateOrders/dateOrders";
import { Link, useNavigate } from "react-router-dom";


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


const ModalOrder = ({ click, basket, userUid, cardId, enventation, userItem, quanty }) => {
    const orderInfo = {
        cardInfo: [],
        status: 'В ожидании',
        data: {
            month: 'Yanuary',
            day: '',
            time: ''
        },
        restorant: '',
        famly: '',
        orderData: new Date().toJSON(),
        userId: userUid,
        userName: '',
        userPhone: '',
        prepayment: '',
        comment: ''
    }
    const [info, setInfo] = useState(orderInfo)
    const [fullPrice, setfullPrice] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        if (basket) {
            setInfo(basket)
            setInfo(prev => ({ ...prev, cardInfo: [...prev.cardInfo, { cardId: cardId, image: enventation.image, fullQuanty: +enventation.quanty, quanty: quanty, price: +enventation.price * +quanty, castPrice: enventation.castPrice }], orderData: new Date().toJSON() }))
        } else {
            setInfo(prev => (
                {
                    ...prev,
                    cardInfo: [...prev.cardInfo, { cardId: cardId, image: enventation.image, fullQuanty: +enventation.quanty, quanty: quanty, price: +enventation.price * +quanty, castPrice: enventation.castPrice }],
                    orderData: new Date().toJSON()
                }))
        }

    }, [basket])
    console.log(info)
    useEffect(() => {
        let price = 0
        if (info.cardInfo.length >= 1) {
            info.cardInfo.forEach(element => {
                price += +element.price;
                setfullPrice(price)
            });
        }
    }, [info])
    /*    useEffect(() => {
            if (userUid == 'FX2ExaD5TGOkoXbohvygrm0SZR62') {
                setInfo(prev => (
                    { ...prev, userId: userUid }
                ))
            } else {
                setInfo(prev => ({ ...prev, userName: userItem.userName, userPhone: userItem.phone, userId: userUid }))
            }
    
        }, [info.quanty])*/
    const registerInvitation = (event) => {
        event.preventDefault()
        const newPostKey1 = GetCardUid(new Date());
        const reportUid = GetDataUid()
        const repotInfo = {
            cardInfo: info.cardInfo, orderData: info.orderData, prepayment: info.prepayment
        }
        const updates = {};
        if (userUid === 'FX2ExaD5TGOkoXbohvygrm0SZR62') {
            updates[`orders/${newPostKey1}`] = info;
            updates[`report/${reportUid}/${newPostKey1}`] = repotInfo;
            info.cardInfo.map(elem => {
                updates[`cards/${elem.cardId}/quanty`] = +elem.fullQuanty - +elem.quanty;
            })
            console.log(updates)
            update(ref(db), updates).then(() => {
                remove(ref(db, `admin/${userUid}/basket`))
                    .then(() => {
                        alert("Заказ Успешно добавнен")
                        setInfo(orderInfo)
                        navigate(-1)
                    })
                    .catch(error => {
                        console.error(error)
                    })
            })
        } else {
            updates[`users/${userUid}/orders/${newPostKey1}`] = info;
            updates[`orders/${newPostKey1}`] = info;
            updates[`report/${reportUid}/${newPostKey1}`] = repotInfo;
            info.cardInfo.map(elem => {
                updates[`cards/${elem.cardId}/quanty`] = +elem.fullQuanty - +elem.quanty;
            })
            update(ref(db), updates).then(() => {
                remove(ref(db, `users/${userUid}/basket`))
                    .then(() => {
                        alert("Заказ Успешно добавнен")
                        setInfo(orderInfo)
                        navigate(-1)
                    })
                    .catch(error => {
                        console.error(error)
                    })
            })
        }


    }
    const addEnventetion = () => {
        const updates = {};
        if (userUid === 'FX2ExaD5TGOkoXbohvygrm0SZR62') {
            updates[`admin/${userUid}/basket`] = info;
            update(ref(db), updates).then(() => {
                navigate('/')
            })
        } else {
            updates[`users/${userUid}/basket`] = info;
            update(ref(db), updates).then(() => {
                navigate('/')
            })
        }
    }
    const getNameValue = (event) => {
        let result = info.cardInfo.findIndex(item => {
            return item.cardId === event.target.id
        })
        setInfo(prev => ({ ...prev, cardInfo: [...prev.cardInfo, ...prev.cardInfo.slice(result, 0, { ...prev.cardInfo[result].birthdayPeople = event.target.value })] }))
    }
    return <div onClick={click} className={styles.modal}>
        <div className={styles.modal__container}>
            <div id="item" className={styles.modal__item}>
                <form onSubmit={registerInvitation} className={styles.modal__form}>
                    {info.cardInfo.length >= 1 ? info.cardInfo.map(el => (
                        <div key={el.cardId} className={styles.form__item}>
                            <p className={styles.selecd__text}>Выбранное(ые) пригласительное(ные)</p>
                            <div key={el.cardId} className={styles.order__info}>
                                <div className={styles.selecd__img}><img src={el.image} alt="" /></div>
                                <p className={styles.quanty}>Количество: {el.quanty}</p>
                            </div>
                            <label htmlFor="groom">Виновники торжества</label>
                            <input className={styles.groom} id={el.cardId} placeholder="Саша и Таня" onChange={getNameValue} value={el.birthdayPeople} type="text" name="name" />
                        </div>))
                        : ''}
                    <label htmlFor="data">Дата и вермя</label>
                    <div className={styles.data}>
                        <select onChange={event => setInfo(prev => ({ ...prev, data: { ...prev.data, month: event.target.value } }))} value={info.data.month} name="month" id="month">
                            <option value="Yanuary">Yanuary</option>
                            <option value="February">February</option>
                            <option value="March">March</option>
                            <option value="April">April</option>
                            <option value="May">May</option>
                            <option value="June">June</option>
                            <option value="july">july</option>
                            <option value="August">August</option>
                            <option value="September">September</option>
                            <option value="October">October</option>
                            <option value="November">November</option>
                            <option value="December">December</option>
                        </select>
                        <label htmlFor="day">День</label><input placeholder="31" onChange={event => setInfo(prev => ({ ...prev, data: { ...prev.data, day: event.target.value } }))} value={info.data.day} type="number" min={'1'} max={'31'} name="day" id={styles.day} />
                        <label htmlFor="time">Время</label><input placeholder="18:00" onChange={event => setInfo(prev => ({ ...prev, data: { ...prev.data, time: event.target.value } }))} value={info.data.time} type="tel" name="data" id={styles.time} />
                    </div>

                    <label htmlFor="restorant">Название Ресторан</label>
                    <input type="text" onChange={event => setInfo(prev => ({ ...prev, restorant: event.target.value }))} value={info.restorant} name="restorant-name" id={styles.restorant} />

                    <label htmlFor="famly">С уважением семьи</label>
                    <input type="text" onChange={event => setInfo(prev => ({ ...prev, famly: event.target.value }))} value={info.famly} name="famly" id={styles.famly} />
                    {userUid === 'FX2ExaD5TGOkoXbohvygrm0SZR62' ?
                        <>
                            <label htmlFor="restorant">Имя клиента</label>
                            <input type="text" onChange={event => setInfo(prev => ({ ...prev, userName: event.target.value }))} value={info.userName} name="user-name" id={styles.restorant} />
                            <label htmlFor="restorant">Номер Клиента</label>
                            <input type="text" onChange={event => setInfo(prev => ({ ...prev, userPhone: event.target.value }))} value={info.userPhone} name="user-phone" id={styles.restorant} />

                        </>
                        : ''
                    }
                    <label htmlFor="restorant">Коментарий</label>
                    <textarea placeholder="Пригласительное должно быть готово уже через 2 дня" type="text" onChange={event => setInfo(prev => ({ ...prev, comment: event.target.value }))} value={info.comment} name="restorant-name" id={styles.restorant} />
                    <label htmlFor="restorant">Предоплата</label>
                    <input placeholder={new Intl.NumberFormat('ru-Ru', { style: 'currency', currency: 'UZS', }).format(fullPrice / 2)} type="text" onChange={event => setInfo(prev => ({ ...prev, prepayment: event.target.value }))} value={info.prepayment} name="user-name" id={styles.restorant} />
                    {fullPrice === '' ? ''
                        : < p className={styles.price__text}>Общая стоимость: <span >{new Intl.NumberFormat('ru-Ru', {
                            style: 'currency',
                            currency: 'UZS',
                        }).format(+fullPrice)}</span></p>}
                    <button className={styles.btn} type="submit">Заказать</button>
                    <button onClick={addEnventetion} className={styles.btn} type="button"><Link to='/'>Дополнить заказ</Link></button>
                </form>
            </div>
        </div >
    </div >
}
export default ModalOrder