import { useTranslation } from 'react-i18next'
import styles from './select.module.css'
const SelectCustom = ({ change }) => {
    const { t, i18n } = useTranslation()
    return <div onChange={change} className={styles.select__wrapper}>
        <select className={styles.select} name="price" id="select">
            <option value="chose">{t("selectfilter")}</option>
            <option value="price-from-high-to-low">{t("selectfilterLow")}</option>
            <option value="price-from-low-to-high">{t("selectfilterhigh")}</option>
        </select>
    </div>

}
export default SelectCustom