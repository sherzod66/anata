import styles from "./auth.module.css"
const SinInUser = ({ submit, state, value }) => {
    return <form onSubmit={submit} className={styles.form__auth}>

        <label htmlFor="email">Введите почту</label>
        <input onChange={(event) => state(prev => ({ ...prev, email: event.target.value }))} value={value.email} name="email" type="email" id={styles.email} placeholder="test@gmail.com" />

        <label htmlFor="pass">Введите пароль</label>
        <input onChange={(event) => state(prev => ({ ...prev, pass: event.target.value }))} value={value.pass} name="password" type="password" id={styles.pass} />
        <button type="submit">Войти</button>
    </form>
}
export default SinInUser