import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import styles from "./header.module.css"
import { list } from "firebase/storage";
import { VscChevronDown } from "react-icons/vsc";
import { useTranslation } from "react-i18next";

const Header = () => {
    const { us, setUser } = useContext(AuthContext)
    const { admin, setAdmin } = useContext(AuthContext)
    const [active, setActive] = useState(false)
    const { t, i18n } = useTranslation()
    const [lang, setLang] = useState({ open: false, lang: 'ru' })
    const getActive = () => {
        setActive(!active)
    }
    useEffect(() => {
        const localLang = localStorage.getItem('i18nextLng')
        if (localLang) {
            document.documentElement.lang = `${localLang}`
            setLang(prev => ({ ...prev, lang: localLang }))
        }
    }, [])

    const changeLang = (languade) => {
        i18n.changeLanguage(languade)
        setLang(prev => ({ ...prev, lang: languade }))
        document.documentElement.lang = `${languade}`
    }
    return (
        <header className={styles.header}>
            <div onClick={getActive} className={`${styles.header__die} ${active ? styles.active : ''}`}></div>
            <div className={styles.header__conatiner}>
                <div className={styles.header__row}>
                    <div className={styles.header__column}>
                        <Link className={styles.header__img} to={"/"}>
                            <img src='/avatar1.jpg' alt="avatar" />
                        </Link>
                    </div>
                    <div className={styles.header__column}>
                        <ul id="headerList" className={`${styles.headerList} ${active ? styles.active : ''}`}>
                            {active ?
                                <div className={styles.header__column}>
                                    {us ? admin ? <Link to={'/admin'}>{t("adminPanel")}</Link> : <Link to={'/profile'}>{t('headerProfile')}</Link> :
                                        <Link to={'/auth'}>{t('enter')}</Link>
                                    }
                                </div>

                                : ''}
                            <li>
                                <Link to={'/invintation-cards'} className={styles.headerLi}>{t("headerList1")}</Link>
                            </li>
                            <li>
                                <Link to={'/about-us'} className={styles.headerLi}>{t("headerList2")}</Link>
                            </li>
                            <li>
                                <Link to={'/sweets'} className={styles.headerLi}>{t("headerList3")}</Link>
                            </li>
                            {active ?
                                <div onClick={() => setLang(prev => ({ ...prev, open: !prev.open }))} className={`${styles.header__column} ${lang.lang === 'en' ? styles.en : ''}`}>
                                    <span>{lang.lang === 'ru' ? 'Ru' : 'En'}<VscChevronDown className={styles.icon} /></span>
                                    <ul className={`${styles.header__lang} ${lang.open ? styles.active : ''}`}>
                                        <li onClick={() => changeLang("ru")}>Ru</li>
                                        <li onClick={() => changeLang("en")}>En</li>
                                    </ul>
                                </div> : ''}
                        </ul>

                    </div>
                    <div className={`${styles.header__column} ${styles.remove}`}>
                        {us ? admin ? <Link to={'/admin'}>{t("adminPanel")}</Link> : <Link to={'/profile'}>{t('headerProfile')}</Link> :
                            <Link to={'/auth'}>{t('enter')}</Link>
                        }
                    </div>
                    <div onClick={() => setLang(prev => ({ ...prev, open: !prev.open }))} className={`${styles.header__column} ${styles.remove} ${lang.lang === 'en' ? styles.en : ''}`}>
                        <span>{lang.lang === 'ru' ? 'Ru' : 'En'}<VscChevronDown className={styles.icon} /></span>
                        <ul className={`${styles.header__lang} ${lang.open ? styles.active : ''}`}>
                            <li onClick={() => changeLang("ru")}>Ru</li>
                            <li onClick={() => changeLang("en")}>En</li>
                        </ul>
                    </div>
                    <div onClick={getActive} className={`${styles.header__burger} ${active ? styles.active : ''}`}><span></span></div>
                </div>
            </div>
        </header>
    )
}
export default Header