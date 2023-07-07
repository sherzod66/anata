import styles from "./serchId.module.css"
const SearchName = (data) => {
    const searchName = (event) => {
        if (data) {
            const orderTitle = document.querySelectorAll('.order__title')
            orderTitle.forEach(item => {
                if (item.textContent.toLowerCase().indexOf(event.target.value.toLowerCase()) === -1) {
                    let itemParent = item.parentNode.parentNode
                    itemParent.parentNode.style.display = 'none'
                } else {
                    let itemParent = item.parentNode.parentNode
                    itemParent.parentNode.style.display = 'block'
                }
            })
        }
    }
    return <div className={styles.filter__id}>
        <label htmlFor="srechID">Поиск по имени</label>
        <input placeholder="Шахбоза и Рухшоны" className={styles.filter__input} onChange={searchName} type="text" id="srechID" />
    </div>
}
export default SearchName