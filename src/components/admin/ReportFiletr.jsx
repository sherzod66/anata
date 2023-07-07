import MoneyInfo from "./MoneyInfo"
import styles from "./serchId.module.css"

const ReportFiletr = ({ getRepotr, data, report }) => {
    return <div className={styles.filter__status}>
        <label htmlFor="status">Отчет за сегодня</label>
        <select onChange={getRepotr} name="status" id="reportDay&M">
            <option value="..">..</option>
            <option value="Отчет за сегодня">Отчет за сегодня</option>
            <option value="Вчера">Вчера</option>
        </select>
        {report ?
            <MoneyInfo data={data} />
            : ''
        }

    </div>
}
export default ReportFiletr