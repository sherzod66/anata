import { getDatabase, ref, remove, update } from "firebase/database";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase-config/firebaseConfig";
import { deleteObject, getStorage, ref as ref2 } from "firebase/storage";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app)
export const changeValue = (data, id) => {
	const updates = {};
	updates[`cards/${id}`] = data;
	update(ref(db), updates)
		.then(() => {
			alert("Successfully modified")
		})
		.catch(error => {
			console.error(error)
		})
}

export const deleteCard = (id, imageN) => {
	return remove(ref(db, `cards/${id}`))
		.then(() => {
			const desertRef = ref2(storage, `images/${imageN}`);
			deleteObject(desertRef).then(() => {
				alert('File deleted successfully')
			}).catch((error) => {
				alert('Uh-oh, an error occurred!')
			});
		})
		.catch(error => {
			alert(error)
		})
}