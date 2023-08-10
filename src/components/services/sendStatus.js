import { getDatabase, ref, update } from "firebase/database";
import { GetDataUidLast } from "../dateOrders/dateOrders";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase-config/firebaseConfig";
const app = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase(app));
export const sendStatus = (event, data, sum, card) => {
    const updates = {};
    if (data.userId === 'FX2ExaD5TGOkoXbohvygrm0SZR62') {
        if (event.target.value === 'Забрал') {
            updates[`orders/${data.id}/status`] = event.target.value;
            updates[`orders/${data.id}/prepayment`] = +data.prepayment + (+sum - +data.prepayment);
            data.cardInfo.forEach(elem => {
                card.forEach(el => {
                    console.log(+el.orders)
                    updates[`cards/${elem.cardId}/orders`] = +el.orders + 1;
                })

            })
            updates[`report/${GetDataUidLast(data.orderData)}/${data.id}/prepayment`] = +data.prepayment + (+sum - +data.prepayment);
            update(dbRef, updates).then(() => {
                const loaded = document.getElementById('loaded-info')
                loaded.classList.add('active')
                setTimeout(() => {
                    loaded.classList.remove('active')
                }, 4000);
            })
        } else {
            updates[`orders/${data.id}/status`] = event.target.value;
            update(dbRef, updates).then(() => {
                const loaded = document.getElementById('loaded-info')
                loaded.classList.add('active')
                setTimeout(() => {
                    loaded.classList.remove('active')
                }, 4000);

            })
        }
    } else {
        if (event.target.value === 'Забрал') {
            updates[`users/${data.userId}/orders/${data.id}/status`] = event.target.value;
            updates[`orders/${data.id}/status`] = event.target.value;
            updates[`orders/${data.id}/prepayment`] = +data.prepayment + (+sum - +data.prepayment);
            data.cardInfo.forEach(elem => {
                card.forEach(el => {
                    console.log(+el.orders)
                    updates[`cards/${elem.cardId}/orders`] = +el.orders + 1;
                })
            })
            updates[`report/${GetDataUidLast(data.orderData)}/${data.id}/prepayment`] = +data.prepayment + (+sum - +data.prepayment);
            update(dbRef, updates).then(() => {
                const loaded = document.getElementById('loaded-info')
                loaded.classList.add('active')
                setTimeout(() => {
                    loaded.classList.remove('active')
                }, 4000);
            })
        } else {
            updates[`users/${data.userId}/orders/${data.id}/status`] = event.target.value;
            updates[`orders/${data.id}/status`] = event.target.value;
            update(dbRef, updates).then(() => {
                const loaded = document.getElementById('loaded-info')
                loaded.classList.add('active')
                setTimeout(() => {
                    loaded.classList.remove('active')
                }, 4000);
            })
        }
    }
}
