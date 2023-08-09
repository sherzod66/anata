import { initializeApp } from 'firebase/app'
import styles from './createCard.module.css'
import { firebaseConfig } from '../firebase-config/firebaseConfig'
import { useState } from 'react'
import { getDatabase, push, ref, set } from 'firebase/database'
import { CreateElectronic } from '../services/createCard'
import { useTranslation } from "react-i18next";
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const electronic = {
	name: '',
	videoName: '',
	href: false
}
const CreateEIvintation = () => {
	const [newElectronic, setNewCard] = useState(electronic)
	const [imgUrl, setimgUrl] = useState(false)
	const { t, i18n } = useTranslation()
	const sendImage = (event) => {
		setimgUrl(URL.createObjectURL(event.target.files[0]))
		CreateElectronic(event.target.files, setNewCard)
	}
	const sendForm = (event) => {
		event.preventDefault()
		if (newElectronic.href) {
			const valid = newElectronic.name !== '' && newElectronic.href !== '';
			if (valid) {
				const postListRef = ref(db, 'electronic');
				const newPostRef = push(postListRef);
				set(newPostRef, newElectronic).then(() => {
					const loaded = document.getElementById('loaded-info')
					loaded.classList.add('active')
					setTimeout(() => {
						loaded.classList.remove('active')
					}, 4000);
					setNewCard(electronic)
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
	console.log(newElectronic);
	return <main className={styles.create__card}>
		<form onSubmit={sendForm} name='create-card'>
			<label htmlFor="name">{t("invintationN")}</label>
			<input onFocus={(e) => console.log("h")} onChange={event => setNewCard(prev => ({ ...prev, name: event.target.value }))} value={newElectronic.name} type="text" name="name" id={styles.firstName} />

			<label htmlFor="imageUrl">Video</label>
			<input onChange={sendImage} type="file" accept='.gif, .mp4, .MOV' name="imageUrl" id={styles.imageUrl} />
			<p style={{ color: '#fff' }}>{newElectronic.href ? 'Фото загружена' : ""}</p>
			{imgUrl ? <div className={styles.create__cardFile}><img src={imgUrl} alt="" /></div> : ''}
			<button id={styles.addBtn}>{t("add")}</button>
		</form>
	</main>
}

export default CreateEIvintation 