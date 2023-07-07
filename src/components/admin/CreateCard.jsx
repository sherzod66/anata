import { initializeApp } from 'firebase/app'
import styles from './createCard.module.css'
import { firebaseConfig } from '../firebase-config/firebaseConfig'
import { useState } from 'react'
import { getDatabase, push, ref, set } from 'firebase/database'
import { CreateCardAdmin } from '../services/createCard'



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
    castPrice: ''
}
const CreateCard = () => {
    const [newCard, setNewCard] = useState(cardObj)
    const [imgUrl, setimgUrl] = useState(false)

    const sendImage = (event) => {
        setimgUrl(URL.createObjectURL(event.target.files[0]))
        CreateCardAdmin(event.target.files, setNewCard)
    }

    const sendForm = (event) => {
        event.preventDefault()
        if (newCard.image) {
            event.preventDefault()
            const postListRef = ref(db, 'cards');
            const newPostRef = push(postListRef);
            set(newPostRef, newCard).then(() => {
                alert('Данные загружены')
                setNewCard(cardObj)
            })
        }


    }
    return <main className={styles.create__card}>
        <form onSubmit={sendForm} name='create-card'>
            <label htmlFor="name">Имя пригласительной</label>
            <input onChange={event => setNewCard(prev => ({ ...prev, name: event.target.value }))} value={newCard.name} type="text" name="firstName" id={styles.firstName} />

            <label htmlFor="imageUrl">Image</label>
            <input onChange={sendImage} type="file" accept='.jpg, .png, .gif, .HEIC' name="imageUrl" id={styles.imageUrl} />
            {imgUrl ? <div className={styles.create__cardFile}><img src={imgUrl} alt="" /></div> : ''}
            <label htmlFor="desctiption">Desctiption</label>
            <textarea onChange={event => setNewCard(prev => ({ ...prev, description: event.target.value }))} value={newCard.description} className="desctiption" id={styles.desctiption}></textarea>


            <label htmlFor="quanty">Количество шт</label>
            <input onChange={event => setNewCard(prev => ({ ...prev, quanty: event.target.value, wasQuanty: event.target.value }))} value={newCard.quanty} type="number" name="quanty" id={styles.cardQuanty} />

            <label htmlFor="price">Стоимость 1шт</label>
            <input onChange={event => setNewCard(prev => ({ ...prev, price: event.target.value }))} value={newCard.price} type="number" name="lastName" id={styles.price} />

            <label htmlFor="price">Себестоимость 1шт</label>
            <input onChange={event => setNewCard(prev => ({ ...prev, castPrice: event.target.value }))} value={newCard.castPrice} type="number" name="lastName" id={styles.price} />

            <button id={styles.addBtn}>Добавить</button>
        </form>
    </main>



}

export default CreateCard