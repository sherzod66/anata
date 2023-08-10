
import { child, get, getDatabase, ref } from "firebase/database"
import { firebaseConfig } from "../firebase-config/firebaseConfig";
import { initializeApp } from "firebase/app";
const app = initializeApp(firebaseConfig);
const dataRef = ref(getDatabase(app));
export const GetCardP = (db, setState, path, hashtag = '', setState2 = null, setState3 = null) => {
    return get(child(db, `${path}`)).then(snapshot => {
        if (snapshot.exists()) {
            const arr = Object.keys(snapshot.val()).map(key => ({
                id: key,
                ...snapshot.val()[key]
            }))
            const filter = arr.filter(item => {
                const str = item.hashtag.includes(hashtag)
                if (str) return item
            })
            const filter1 = arr.filter(item => {
                const str = item.hashtag.includes(hashtag)
                if (str) return item
            })
            const filter2 = arr.filter(item => {
                const str = item.hashtag.includes(hashtag)
                if (str) return item
            })
            filter1.sort((a, b) => a.price - b.price).reverse()
            filter2.sort((a, b) => a.price - b.price)
            setState(filter)
            if (!setState2 && !setState3) return
            setState2(filter2)
            setState3(filter)
        } else {
            console.log("No data available");
        }

    }).catch((error) => {
        console.error(error);
    });
}