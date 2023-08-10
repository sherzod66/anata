import { useTranslation } from "react-i18next"
import { loazyLoadImage } from "../loazy load/loazyImage"
import styles from "./serchId.module.css"
const SerchId = ({ data, id }) => {
    const { t, i18n } = useTranslation()
    const serchId = (event) => {
        if (data) {
            if (id === 'orders') {
                const item = document.querySelectorAll('#order__column, #order__id')
                item.forEach(elem => {
                    if (elem.innerText.toLowerCase().search(event.target.value) === -1) {
                        elem.style.display = 'none'
                    } else {
                        elem.style.display = 'block'
                        loazyLoadImage()
                    }
                })
            } else {
                const item = document.querySelectorAll('.order__column, .card__uid')
                item.forEach(elem => {
                    if (elem.innerText.toLowerCase().search(event.target.value.toLowerCase()) === -1) {
                        elem.style.display = 'none'
                    } else {
                        elem.style.display = 'block'
                        loazyLoadImage()
                    }
                })
            }
        }
    }
    return <div className={styles.filter__id}>
        <label htmlFor="srechID">{t("adminSearchId")}</label>
        {id === "create-order" ?
            <input placeholder="nsada" className={styles.filter__input} onChange={serchId} type="text" id="srechID" />
            :
            <input placeholder="1028189" className={styles.filter__input} onChange={serchId} type="number" id="srechID" />
        }

    </div>

}
export default SerchId