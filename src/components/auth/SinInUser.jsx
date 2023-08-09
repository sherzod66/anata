import { useTranslation } from "react-i18next"
import styles from "./auth.module.css"
const SinInUser = ({ submit, state, value }) => {
    const { t, i18n } = useTranslation();
    return <form onSubmit={submit} className={styles.form__auth}>
        <label htmlFor="email">{t("authEmail")}</label>
        <input onChange={(event) => state(prev => ({ ...prev, email: event.target.value }))} value={value.email} name="email" type="email" id={styles.email} placeholder="test@gmail.com" />
        <div id="loginError" className='login__error'>Пользователь не найден</div>
        <label htmlFor="pass">{t('authPass')}</label>
        <input onChange={(event) => state(prev => ({ ...prev, pass: event.target.value }))} value={value.pass} name="password" type="password" id={styles.pass} />
        <div id="passerror" className='pass__error'>Пароль введен не верно</div>
        <button type="submit">{t("authSignIn")}</button>
    </form>
}
export default SinInUser