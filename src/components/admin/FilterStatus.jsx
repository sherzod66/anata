import styles from "./serchId.module.css"
const FilterStatus = ({ data }) => {
    function getStatus(event) {
        if (data) {
            const item = document.querySelectorAll('#status')
            item.forEach(elem => {
                if (elem.innerText.toLowerCase().indexOf(event.target.value.toLowerCase()) === -1) {
                    let parent = elem.parentNode.parentNode.parentNode
                    parent.parentNode.style.display = 'none'
                } else {
                    let parent = elem.parentNode.parentNode.parentNode
                    parent.parentNode.style.display = 'block'
                }
            })
            if (event.target.value === 'Все') {
                const column = document.querySelectorAll('#order__column')
                column.forEach(i => {
                    i.style.display = 'block'
                })
            }
        }
    }
    return <div className={styles.filter__status}>
        <label htmlFor="status">Поиск по статусу</label>
        <select onChange={getStatus} name="status" id="status">
            <option value="В ожидании">В ожидании</option>
            <option value="В процессе">В процессе</option>
            <option value="Можно забирать">Можно забирать</option>
            <option value="Забрал">Забрал</option>
            <option value="Все">Все</option>
        </select>
    </div>
}
export default FilterStatus