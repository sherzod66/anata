import styles from "./serchId.module.css"
import { useTranslation } from 'react-i18next'
const FilterStatus = ({ getStatus }) => {
    const { t, i18n } = useTranslation()
    return <div className={styles.filter__status}>
        <label htmlFor="status">{t("adminFilter")}</label>
        <select onChange={getStatus} name="status" id="status">
            <option value="....">....</option>
            <option value="Нужно сделать">{t("filterNeedToDo")}</option>
            <option value="В процессе">{t("statusProgress")}</option>
            <option value="Можно забирать">{t("statusCan")}</option>
            <option value="Забрал">{t("statusTook")}</option>
            <option value="Все">{t("filterAll")}</option>
        </select>
    </div>
}
export default FilterStatus