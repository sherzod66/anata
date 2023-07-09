import { initializeApp } from "firebase/app";
import { useParams } from "react-router-dom"
import { getDatabase, ref } from "firebase/database"
import { useEffect, useState } from "react";
import { GetCardDetai } from "../services/service";
import { firebaseConfig } from "../firebase-config/firebaseConfig";
import Header from "../header/Header";
import CardSection from "./CardSection";


// Initialize Firebase
const app = initializeApp(firebaseConfig);


const CardDetail = () => {
    const { id } = useParams()
    const [card, setCard] = useState()
    const dbRef = ref(getDatabase(app));
    useEffect(() => {
        if (!id) return
        GetCardDetai(dbRef, setCard, id,)
    }, [id])
    console.log(card)
    return (
        <>
            <Header image={"/vite.svg"} />
            {card ? <CardSection cardId={id} card={card} /> : <p>Нечего не найдено</p>}
        </>
    )
}
export default CardDetail
