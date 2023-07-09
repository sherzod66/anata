import { onAuthStateChanged } from "firebase/auth";
import { child, get, } from "firebase/database"
export const GetCardDetai = (db, state, id) => {
    return get(child(db, 'cards/' + id)).then(snapshot => {
        if (snapshot.exists()) {
            state(snapshot.val())
            console.log(snapshot.val())
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

export const GetCard = (db, setState, path) => {
    return get(child(db, `${path}`)).then(snapshot => {
        if (snapshot.exists()) {
            const arr = Object.keys(snapshot.val()).map(key => ({
                id: key,
                ...snapshot.val()[key]
            }))
            arr.reverse()
            setState(arr)
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
            setState(arr)
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



