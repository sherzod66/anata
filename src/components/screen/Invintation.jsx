import Footer from "../footer/Footer"
import Header from "../header/Header"
import UserPosition from "../ui/UserPosition"
import Cards from "../comomodity-cards/Cards"
import { useTranslation } from "react-i18next"

const Invintation = () => {
    const { t, i18n } = useTranslation()
    return <>
        <Header />
        <UserPosition title={t("headerList1")} />
        <Cards url={'invintation-cards'} />
        <Footer />
    </>
}
export default Invintation