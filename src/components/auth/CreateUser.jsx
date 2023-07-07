import styles from "./auth.module.css"
const CreateUser = ({ submit, state, value }) => {
    return <form onSubmit={submit} className={styles.form__auth}>
        <label htmlFor="name">Введите имя</label>
        <input onChange={(event) => state(prev => ({ ...prev, name: event.target.value }))} value={value.name} name="name" type="text" id={styles.name} placeholder="Антон" />

        <label htmlFor="email">Введите почту</label>
        <input onChange={(event) => state(prev => ({ ...prev, email: event.target.value }))} value={value.email} name="email" type="email" id={styles.email} placeholder="test@gmail.com" />

        <label htmlFor="phone">Введите номер телефона</label>
        <input onChange={(event) => state(prev => ({ ...prev, phone: event.target.value }))} value={value.phone} name="phone" type="tel" id={styles.phone} placeholder="+9989" />

        <label htmlFor="pass">Введите пароль</label>
        <input onChange={(event) => state(prev => ({ ...prev, pass: event.target.value }))} value={value.pass} name="password" type="password" id={styles.pass} />
        <button type="submit">Зарегистрироваться</button>
    </form>

}
export default CreateUser