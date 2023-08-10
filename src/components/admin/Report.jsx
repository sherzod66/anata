
import { Link } from "react-router-dom"
const Report = ({ report }) => {
    return <div className="order__column">
        <Link to={'/card/' + report.cardId} className="order__item">
            <div className="order__img"><img src={report.image} alt="" /></div>
            <div className="order__body rp">
                <div className="card__uid">№: {report.cardId}</div>
                <div className="card__orders">Проданно: {report.quanty} штук</div>

            </div>
        </Link >
    </div >
}
export default Report