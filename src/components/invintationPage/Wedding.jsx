import { useTranslation } from "react-i18next"
import Cards from "../comomodity-cards/Cards"
import Footer from "../footer/Footer"
import Header from "../header/Header"
import UserPosition from "../ui/UserPosition"
import { useEffect } from 'react'
const Wedding = () => {
    const { t, i18n } = useTranslation()
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }, [])
    return <>
        <Header />
        <UserPosition title={t("headerList1")} subTitle={`/${t("wedding")} `} />
        <Cards url={'wedding'} />
        <Footer />
    </>
}
export default Wedding