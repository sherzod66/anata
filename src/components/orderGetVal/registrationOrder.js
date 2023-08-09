import { getDatabase, ref, remove, update } from "firebase/database";
import { GetCardUid, GetDataUid } from "../dateOrders/dateOrders";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase-config/firebaseConfig";
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const registerInvitation = (event, info, userUid, setState, navigate) => {
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
    event.preventDefault()
    document.body.style.overflow = "auto"
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
        update(ref(db), updates).then(() => {
            remove(ref(db, `admin/${userUid}`))
                .then(() => {
                    alert("Заказ Успешно добавнен")
                    setState(orderInfo)
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
                    setState(orderInfo)
                    navigate(-1)
                })
                .catch(error => {
                    console.error(error)
                })
        })
    }
}
export const addEnventetion = (userUid, info, navigate) => {
    document.body.style.overflow = "auto"
    const updates = {};
    if (userUid === 'FX2ExaD5TGOkoXbohvygrm0SZR62') {
        updates[`admin/${userUid}/basket`] = info;
        update(ref(db), updates).then(() => {
            navigate('/admin/create-order')
        })
    } else {
        updates[`users/${userUid}/basket`] = info;
        update(ref(db), updates).then(() => {
            navigate('/invintation-cards')
        })
    }
}
export const removeEnventetion = (userUid, navigate, setState) => {
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
    document.body.style.overflow = "auto"
    if (userUid === 'FX2ExaD5TGOkoXbohvygrm0SZR62') {
        remove(ref(db, `admin/${userUid}`))
            .then(() => {
                alert("Данные удалены")
                setState(orderInfo)
                navigate('/admin/')
            })
            .catch(error => {
                console.error(error)
            })
    } else {
        remove(ref(db, `users/${userUid}/basket`))
            .then(() => {
                alert("Данные удалены")
                setState(orderInfo)
                navigate('/')

            })
            .catch(error => {
                console.error(error)
            })
    }
}
export const getTicket = (userUid, info) => {
    const updates = {};
    updates[`admin/${userUid}/ticket`] = info;
    update(ref(db), updates).then(() => {
        window.open('http://anatasam.uz/ticket/', '_blank', '')
    })
}