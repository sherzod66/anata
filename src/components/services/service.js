import { onAuthStateChanged } from "firebase/auth";
import { child, get, getDatabase, ref, remove, } from "firebase/database"
import { firebaseConfig } from "../firebase-config/firebaseConfig";
import { initializeApp } from "firebase/app";
const app = initializeApp(firebaseConfig);
const dataRef = ref(getDatabase(app));

export const GetCardDetai = (db, state, id) => {
	return get(child(db, 'cards/' + id)).then(snapshot => {
		if (snapshot.exists()) {
			state(snapshot.val())
		} else {
			console.log("No data available");
		}
	}).catch((error) => {
		console.error(error);
	});
}

export const GetCard = (db, setState, path, setState2 = null, setState3 = null) => {
	return get(child(db, `${path}`)).then(snapshot => {
		if (snapshot.exists()) {
			const arr = Object.keys(snapshot.val()).map(key => ({
				id: key,
				...snapshot.val()[key]
			}))
			const arr2 = Object.keys(snapshot.val()).map(key => ({
				id: key,
				...snapshot.val()[key]
			}))
			arr.sort((a, b) => a.price - b.price).reverse()
			arr2.sort((a, b) => a.price - b.price)
			setState(arr)
			if (!setState2 && !setState3) return
			setState2(arr2)
			const g = Object.keys(snapshot.val()).map(key => ({
				id: key,
				...snapshot.val()[key]
			}))
			setState3(g)
		} else {
			console.log("No data available");
		}

	}).catch((error) => {
		console.error(error);
	});
}

export const GetUser = (db, setUser, setOrders, path) => {
	return get(child(db, `${path}`)).then(snapshot => {
		if (snapshot.exists()) {
			setUser(snapshot.val())
			const arrOrders = Object.keys(snapshot.val().orders).map(key => ({
				id: key,
				...snapshot.val().orders[key]
			}))
			arrOrders.reverse()
			setOrders(arrOrders)
		} else {
			console.log("No data available");
		}

	}).catch((error) => {
		console.error(error);
	});
}

export const GetOnlyUser = (db, uid, setData) => {
	return get(child(db, `users/${uid}`)).then(snapshot => {
		if (snapshot.exists()) {
			setData(snapshot.val())
		} else {
			console.log("No data available");
		}
	}).catch((error) => {
		console.error(error);
	});
}


export const GetReport = (db, setState, path, setState2) => {
	return get(child(db, `${path}`)).then(snapshot => {
		if (snapshot.exists()) {
			const arr = Object.keys(snapshot.val()).map(key => ({
				id: key,
				...snapshot.val()[key]
			}))
			arr.reverse()
			for (let index = 0; index < arr.length; index++) {
				setState(prev => ([...prev, ...arr[index].cardInfo]))
			}
			setState2(arr)
		} else {
			console.log("No data available");
		}

	}).catch((error) => {
		console.error(error);
	});
}

export const GetBasket = (db, uid, setData, path) => {
	return get(child(db, `${path}/${uid}/basket`)).then(snapshot => {
		if (snapshot.exists()) {
			setData(snapshot.val())
		} else {
			console.log("No data available");
		}
	}).catch((error) => {
		console.error(error);
	});
}


export const GetCardDetaile = (db, state, id) => {
	return get(child(db, 'cards/' + id)).then(snapshot => {
		if (snapshot.exists()) {
			state(prev => [...prev, snapshot.val()])
		} else {
			console.log("No data available");
		}
	}).catch((error) => {
		console.error(error);
	});
}

export const GetOrderTicket = (state, id) => {
	return get(child(dataRef, 'admin/' + id + '/ticket')).then(snapshot => {
		if (snapshot.exists()) {
			state(snapshot.val())
		} else {
			console.log("No data available");
		}
	}).catch((error) => {
		console.error(error);
	});
}

export const GetCardOrders = (db, setState, path, setState2 = null) => {
	return get(child(db, `${path}`)).then(snapshot => {
		if (snapshot.exists()) {
			const arr = Object.keys(snapshot.val()).map(key => ({
				id: key,
				...snapshot.val()[key]
			}))
			//const filter = arr.filter(elem => +elem.lastDate > +Date.parse(new Date()))
			arr.sort((x, y) => x.lastDate - y.lastDate);
			setState(arr);
			setState2(arr)
		} else {
			console.log("No data available");
		}

	}).catch((error) => {
		console.error(error);
	});
}



