import { loazyLoadImage } from "../loazy load/loazyImage"
import styles from "./serchId.module.css"
import { useTranslation } from "react-i18next";
const SearchName = (data, id) => {
    const { t, i18n } = useTranslation()
    const searchName = (event) => {
        if (data) {
            if (id === 'orders') {
                const orderTitle = document.querySelectorAll('#nameP')
                orderTitle.forEach(item => {
                    if (item.textContent.toLowerCase().indexOf(event.target.value.toLowerCase()) === -1) {
                        let itemParent = item.parentNode.parentNode.parentNode.parentNode
                        itemParent.parentNode.style.display = 'none'
                    } else {
                        let itemParent = item.parentNode.parentNode.parentNode.parentNode
                        itemParent.parentNode.style.display = 'block'
                        loazyLoadImage()
                    }
                })
            } else {
                const orderTitle = document.querySelectorAll('#nameP')
                orderTitle.forEach(item => {
                    if (item.textContent.toLowerCase().indexOf(event.target.value.toLowerCase()) === -1) {
                        let itemParent = item.parentNode.parentNode
                        itemParent.parentNode.style.display = 'none'
                    } else {
                        let itemParent = item.parentNode.parentNode
                        itemParent.parentNode.style.display = 'block'
                        loazyLoadImage()
                    }
                })
            }
        }
    }
    return <div className={styles.filter__id}>
        <label htmlFor="srechID">{t("adminSearchName")}</label>
        <input placeholder="Шахбоза и Рухшоны" className={styles.filter__input} onChange={searchName} type="text" id="srechID" />
    </div>
}
export default SearchName