import { useEffect, useState } from "react"
import { GetCardDetaile } from "../services/service"
import { getDatabase, ref, remove, update } from "firebase/database";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase-config/firebaseConfig";
import AdminOrdersHtml from "./AdminOrdersHtml";
const app = initializeApp(firebaseConfig);
const AdminOrders = ({ data }) => {
    const [card, useCard] = useState('')
    const [sum, setSume] = useState('')
    const firebaseDb = getDatabase(app);
    const dbRef = ref(getDatabase(app));
    useEffect(() => {
        if (!data.cardInfo) return
        data.cardInfo.map(el => {
            GetCardDetaile(dbRef, useCard, el.cardId)//Нужно решить
        })
        //
    }, [data])
    useEffect(() => {
        if (data.cardInfo) {
            let s = 0
            for (let index = 0; index < data.cardInfo.length; index++) {
                s += +data.cardInfo[index].price;
                setSume(s)
            }
        }
    }, [data])
    const removeOrder = (event) => {
        if (data.status === 'В ожидании') {
            if (data.userId === 'FX2ExaD5TGOkoXbohvygrm0SZR62') {
                remove(ref(firebaseDb, `orders/${data.id}`))
                    .then(() => {
                        alert("Заказ Успешно Удален")
                    })
                    .catch(error => {
                        console.error(error)
                    })
            } else {
                remove(ref(firebaseDb, `users/${data.userId}/orders/${data.id}`))
                    .then(() => {
                    })
                    .catch(error => {
                        console.error(error)
                    })
                remove(ref(firebaseDb, `orders/${data.id}`))
                    .then(() => {
                        alert("Заказ Успешно Удален")
                    })
                    .catch(error => {
                        console.error(error)
                    })
            }
        }
    }
    return <AdminOrdersHtml data={data} removeOrder={removeOrder} sum={sum} card={card} />


}
export default AdminOrders