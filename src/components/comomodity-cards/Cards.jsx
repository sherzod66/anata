import styles from '../comomodity-cards/cards.module.css'
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, set, DataSnapshot } from "firebase/database"
import { useEffect, useState } from 'react';
import Card from './Card';
import { firebaseConfig } from '../firebase-config/firebaseConfig';
import { GetCard } from '../services/service';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const Cards = () => {
    const [data, setData] = useState('')
    const dbRef = ref(getDatabase(app));
    useEffect(() => {
        GetCard(dbRef, setData, 'cards')
    }, [])
    return (
        <nav className={styles.nav}>
            <div className={styles.nav__container}>
                <div className={styles.nav__row}>
                    {data.length ? data.map(card => (
                        <Card key={card.id} card={card} />
                    )) : <p>Загрузка...</p>
                    }
                </div>
            </div>
        </nav>

    )
}
export default Cards