import { Link } from 'react-router-dom'
import styles from './choose.module.css'
import { useTranslation } from 'react-i18next'
import { VscChevronDown } from "react-icons/vsc";
import { useState } from 'react';

const ChooseComponent = () => {
    const { t, i18n } = useTranslation()
    let localS = localStorage.getItem('i18nextLng')
    const [language, setLanguage] = useState({ open: false, lang: localS ? localS : 'ru' })
    const setLang = () => {
        setLanguage(prev => ({ ...prev, open: !language.open }))
    }
    const changeLanguage = (language) => {
        i18n.changeLanguage(language)
        setLanguage(prev => ({ ...prev, open: false, lang: language }))
    }
    return <div className={styles.choose}>
        <div className={`${styles.choose__lang} ${language.lang === 'en' ? styles.lang : ''}`}>
            <p onClick={setLang}>{language.lang === 'ru' ? "Ru" : "En"}<VscChevronDown className={styles.icon} /></p>
            <ul className={`${styles.choose__lang_list} ${language.open ? styles.active : ''}`}>
                <li onClick={() => changeLanguage('ru')}>Ru</li>
                <li onClick={() => changeLanguage('en')}>En</li>
            </ul>
        </div>
        <div className={styles.choose__container}>
            <div className={styles.choose__row}>
                <Link to={'/invintation'} className={styles.choose__column}>
                    <div className={styles.choose__title}>{t("headerList1")}</div>
                    <img src="https://almode.ru/uploads/posts/2021-02/1614229802_3-p-svadebnie-priglasitelnie-2021-3.jpg" alt="" />
                </Link>
                <Link to={'/sweets'} className={styles.choose__column}>
                    <div className={styles.choose__title}>{t("headerList3")}</div>
                    <img src="https://chocosite.ru/wp-content/uploads/2023/02/main.jpg" alt="" />
                </Link>
            </div>
        </div>
    </div>
}
export default ChooseComponent