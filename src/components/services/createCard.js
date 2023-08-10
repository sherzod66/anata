import { initializeApp } from 'firebase/app'
import { getDownloadURL, getStorage, listAll, ref, uploadBytes } from 'firebase/storage'
import { firebaseConfig } from '../firebase-config/firebaseConfig'
const app = initializeApp(firebaseConfig)

export const CreateCardAdmin = (files, setData) => {
	let value = files[0].name
	const storage = getStorage(app)
	const imageListRef = ref(storage, 'images/')
	const storageRef = ref(storage, `images/${value}`)
	uploadBytes(storageRef, files[0]).then((snapshot) => {
		listAll(imageListRef).then((response) => {
			const serchImg = response.items.findIndex(item => {
				return item._location.path_ === 'images/' + value
			});
			getDownloadURL(response.items[serchImg]).then(url => {
				setData(prev => ({ ...prev, image: url }))
			})
		})
	})
}

export const CreateElectronic = (files, setData, setLoad) => {
	let value = Math.round(Math.random() * 1000) + files[0].name;
	const storage = getStorage(app)
	const imageListRef = ref(storage, 'videos/')
	const storageRef = ref(storage, `videos/${value}`)
	uploadBytes(storageRef, files[0]).then((snapshot) => {
		listAll(imageListRef).then((response) => {
			const serchImg = response.items.findIndex(item => {
				return item._location.path_ === 'videos/' + value
			});
			getDownloadURL(response.items[serchImg]).then(url => {
				setData(prev => ({ ...prev, href: url, videoName: value }))
				setLoad(prev => ({ ...prev, status: 'loaded' }))
			})
		})
	})
}