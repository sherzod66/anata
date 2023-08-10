
import { child, get, getDatabase, ref, remove, } from "firebase/database"
import { firebaseConfig } from "../firebase-config/firebaseConfig";
import { initializeApp } from "firebase/app";
import { deleteObject, getStorage, ref as ref2 } from "firebase/storage";
const app = initializeApp(firebaseConfig);
const firebaseDb = getDatabase(app)
const dataRef = ref(getDatabase(app));
const storage = getStorage(app)
export const GetElectronicDate = (path, setState) => {
	return get(child(dataRef, `${path}`)).then(snapshot => {
		if (snapshot.exists()) {
			const arr = Object.keys(snapshot.val()).map(key => ({
				id: key,
				...snapshot.val()[key]
			}))
			setState(arr)
		} else {
			console.log("No data available");
		}

	}).catch((error) => {
		console.error(error);
	});
}

export const GetElectroDetail = (state, id) => {
	return get(child(dataRef, 'electronic/' + id)).then(snapshot => {
		if (snapshot.exists()) {
			state(snapshot.val())
		} else {
			console.log("No data available");
		}
	}).catch((error) => {
		console.error(error);
	});
}

export const RemoveElectronic = (id, videoName) => {
	remove(ref(firebaseDb, `electronic/${id}`))
		.then(() => {
		})
		.catch(error => {
			console.error(error)
		})
	const desertRef = ref2(storage, `videos/${videoName}`);
	deleteObject(desertRef).then(() => {
		alert('File deleted successfully')
	}).catch((error) => {
		alert('Uh-oh, an error occurred!')
	});

}