import styles from '../comomodity-cards/cards.module.css'
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database"
import { useEffect, useState } from 'react';
import Card from './Card';
import { firebaseConfig } from '../firebase-config/firebaseConfig';
import { GetCard } from '../services/service';
import CardLoad from './CardLoad';
import SelectCustom from '../ui/selectCustom/SelectCustom';
import { GetCardP } from '../services/pageSevice';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const Cards = ({ url }) => {
    const [data, setData] = useState('')
    const [dataChange, setDataChange] = useState('')
    const [global, setGlobal] = useState([])
    const dbRef = ref(getDatabase(app));
    useEffect(() => {
        if (url === 'wedding') {
            GetCardP(dbRef, setData, 'cards', url, setDataChange, setGlobal)
        }
        else if (url === 'sunnat') {
            GetCardP(dbRef, setData, 'cards', url, setDataChange, setGlobal)
        }
        else if (url === 'congratulatory') {
            GetCardP(dbRef, setData, 'cards', url, setDataChange, setGlobal)
        }
        else if (url === 'anniversary') {
            GetCardP(dbRef, setData, 'cards', url, setDataChange, setGlobal)
        }
        else if (url === 'invintation-cards') {
            GetCard(dbRef, setData, 'cards', setDataChange, setGlobal)
        }
    }, [])
    const sortSelect = (event) => {
        if (event.target.value === 'price-from-high-to-low') {
            setGlobal(data)
            //setData(sort)
        } else if (event.target.value === 'price-from-low-to-high') {
            setGlobal(dataChange)
        }
    }
    console.log("LOw: ", data);
    console.log("high: ", dataChange);
    return (
        <nav className={styles.nav}>
            <div className={styles.nav__container}>
                <SelectCustom change={sortSelect} />
                <div className={styles.nav__row}>
                    {global.length ? global.map(card => (
                        <Card key={card.id} card={card} />
                    )) : <CardLoad />
                    }
                </div>
            </div>
        </nav>

    )
}
export default Cards