import { initializeApp } from "firebase/app";
import { useParams } from "react-router-dom"
import { getDatabase, ref } from "firebase/database"
import { useEffect, useState } from "react";
import { GetCardDetai } from "../services/service";
import { firebaseConfig } from "../firebase-config/firebaseConfig";
import Header from "../header/Header";
import CardSection from "./CardSection";
import UserPosition from '../ui/UserPosition'
import CardSectionLoad from "./CardSectionLoad";
import Footer from "../footer/Footer";
import { useTranslation } from "react-i18next";

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const CardDetail = () => {
    const { id } = useParams()
    const [card, setCard] = useState()
    const { t, i18n } = useTranslation()
    const dbRef = ref(getDatabase(app));
    useEffect(() => {
        if (!id) return
        GetCardDetai(dbRef, setCard, id,)
    }, [id])
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
    return (
        <>
            <Header image={"/vite.svg"} />
            <UserPosition title={t("theInvitation")} subTitle={`/${id}`} />
            {card ? <CardSection cardId={id} card={card} /> : <CardSectionLoad />}
            <Footer />
        </>
    )
}
export default CardDetail
