import { useEffect, useState } from "react"
import { child, get, getDatabase, ref } from "firebase/database";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase-config/firebaseConfig";
import styles from "./serchId.module.css"

const app = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase(app));

const MoneyInfo = (data) => {
    const [card, setCard] = useState('')
    const [sum, setSum] = useState('')
    const [profit, setprofit] = useState('')
    console.log(data.data);
    useEffect(() => {
        data.data.forEach(element => {
            get(child(dbRef, 'cards/' + element.cardId)).then(snapshot => {
                if (snapshot.exists()) {
                    setCard(prev => ([...prev, snapshot.val()]))
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        });
    }, [])
    useEffect(() => {
        let sum = 0
        for (let index = 0; index < data.data.length; index++) {
            sum += +data.data[index].prepayment;
            setSum(sum)
        }
        let sumProfit = 0
        for (let index = 0; index < data.data.length; index++) {
            sumProfit += +data.data[index].prepayment - (+data.data[index].castPrice * data.data[index].quanty);
            setprofit(sumProfit)
        }
    }, [])
    return <div className={styles.money__info}>
        <div className={styles.money__infoBody}>
            <div className={styles.money__infoTitle}>Заработанные деньги</div>
            <div className={styles.money__infoMoney}>Заработано: {new Intl.NumberFormat('ru-Ru', {
                style: 'currency',
                currency: 'UZS',
            }).format(sum)}</div>
            <div className={styles.money__infoProfit}>Чистой прибыли: {new Intl.NumberFormat('ru-Ru', {
                style: 'currency',
                currency: 'UZS',
            }).format(profit)}</div>
        </div>
    </div>
}
export default MoneyInfo