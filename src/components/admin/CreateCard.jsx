import { initializeApp } from 'firebase/app'
import styles from './createCard.module.css'
import { firebaseConfig } from '../firebase-config/firebaseConfig'
import { useState } from 'react'
import { getDatabase, push, ref, set } from 'firebase/database'
import { CreateCardAdmin } from '../services/createCard'
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom'
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const cardObj = {
    image: false,
    name: '',
    description: '',
    wasQuanty: '',
    quanty: '',
    price: '',
    orders: 0,
    castPrice: '',
    hashtag: ''
}
const CreateCard = () => {
    const navigate = useNavigate()
    const [newCard, setNewCard] = useState(cardObj)
    const [imgUrl, setimgUrl] = useState(false)
    const { t, i18n } = useTranslation()
    const sendImage = (event) => {
        setimgUrl(URL.createObjectURL(event.target.files[0]))
        CreateCardAdmin(event.target.files, setNewCard)
    }
    const sendForm = (event) => {
        event.preventDefault()
        if (newCard.image) {
            const valid = newCard.name !== '' && newCard.description !== '' && newCard.wasQuanty !== '' && newCard.quanty !== '' && newCard.price !== '' && newCard.orders !== '' && newCard.castPrice !== '' && newCard.hashtag !== '';
            if (valid) {
                const postListRef = ref(db, 'cards');
                const newPostRef = push(postListRef);
                set(newPostRef, newCard).then(() => {
                    const loaded = document.getElementById('loaded-info')
                    loaded.classList.add('active')
                    setTimeout(() => {
                        loaded.classList.remove('active')
                    }, 4000);
                    setNewCard(cardObj)
                })
            } else {
                const errorF = document.getElementById('error-filled')
                errorF.classList.add('active')
                setTimeout(() => {
                    errorF.classList.remove('active')
                }, 3000);
            }

        } else {
            const error = document.getElementById('error-window')
            error.classList.add('active')
            setTimeout(() => {
                error.classList.remove('active')
            }, 3000);
        }
    }
    const cleareHastag = (h) => {
        const clearH = newCard.hashtag.split(' ')
        const sarchA = clearH.indexOf(`${h}`)
        clearH.splice(sarchA, 1)
        console.log(clearH)
        const joinArr = clearH.join(' ')
        return joinArr
    }
    console.log(newCard);
    return <main className={styles.create__card}>
        <form onSubmit={sendForm} name='create-card'>
            <label htmlFor="name">{t("invintationN")}</label>
            <input onFocus={(e) => console.log("h")} onChange={event => setNewCard(prev => ({ ...prev, name: event.target.value }))} value={newCard.name} type="text" name="name" id={styles.firstName} />

            <label htmlFor="imageUrl">Image</label>
            <input onChange={sendImage} type="file" accept='.jpg, .png, .gif, .HEIC, .MOV' name="imageUrl" id={styles.imageUrl} />
            <p style={{ color: '#fff' }}>{newCard.image ? 'Фото загружена' : ""}</p>
            {imgUrl ? <div className={styles.create__cardFile}><img src={imgUrl} alt="" /></div> : ''}
            <label htmlFor="desctiption">{t("description")}</label>
            <textarea onChange={event => setNewCard(prev => ({ ...prev, description: event.target.value }))} value={newCard.description} className="desctiption" id={styles.desctiption}></textarea>

            <label htmlFor="quanty">{t("amount")}</label>
            <input onChange={event => setNewCard(prev => ({ ...prev, quanty: event.target.value, wasQuanty: event.target.value }))} value={newCard.quanty} type="number" name="quanty" id={styles.cardQuanty} />

            <label htmlFor="price">{t("cost1price")}</label>
            <input onChange={event => setNewCard(prev => ({ ...prev, price: event.target.value }))} value={newCard.price} type="number" name="price" id={styles.price} />

            <label htmlFor="price">{t("costprice")}</label>
            <input onChange={event => setNewCard(prev => ({ ...prev, castPrice: event.target.value }))} value={newCard.castPrice} type="number" name="costPrice" id={styles.price} />
            <div className={styles.checkBox}>
                <p>{t("typeInvintation")}</p>
                <div>
                    <label htmlFor="wedding">{t("wedding")}</label>
                    <input onChange={event => setNewCard(prev => ({ ...prev, hashtag: `${event.target.checked ? prev.hashtag === '' ? prev.hashtag + '#wedding' : prev.hashtag + " " + '#wedding' : cleareHastag('#wedding')}` }))} type="checkbox" name="wedding" id={styles.wedding} />
                </div>
                <div>
                    <label htmlFor="sunnat">{t("sunnat")}</label>
                    <input onChange={event => setNewCard(prev => ({ ...prev, hashtag: `${event.target.checked ? prev.hashtag === '' ? prev.hashtag + '#sunnat' : prev.hashtag + " " + '#sunnat' : cleareHastag('#sunnat')}` }))} type="checkbox" name="sunnat" id={styles.sunnat} /></div>
                <div><label htmlFor="congratulatory">{t("congratulatory")}</label>
                    <input onChange={event => setNewCard(prev => ({ ...prev, hashtag: `${event.target.checked ? prev.hashtag === '' ? prev.hashtag + '#congratulatory' : prev.hashtag + " " + '#congratulatory' : cleareHastag('#congratulatory')}` }))} type="checkbox" name="congratulatory" id={styles.congratulatory} /></div>
                <div>
                    <label htmlFor="anniversary">{t("anniversary")}</label>
                    <input onChange={event => setNewCard(prev => ({ ...prev, hashtag: `${event.target.checked ? prev.hashtag === '' ? prev.hashtag + '#anniversary' : prev.hashtag + " " + '#anniversary' : cleareHastag('#anniversary')}` }))} type="checkbox" name="anniversary" id={styles.anniversary} />
                </div>
            </div>
            <button id={styles.addBtn}>{t("add")}</button>
        </form>
    </main>



}

export default CreateCard