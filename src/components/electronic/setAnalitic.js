import { getDatabase, push, ref, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase-config/firebaseConfig";
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const setAnalitic = () => {
	const newCard = {
		date: new Date().toLocaleString(),
		modal: navigator.platform
	}
	const postListRef = ref(db, 'analytics');
	const newPostRef = push(postListRef);
	set(newPostRef, newCard)
}