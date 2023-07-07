import { Link } from "react-router-dom"
const AdminCreateO = ({ data }) => {
    return <div className="order__column">
        <Link to={'/card/' + data.id} className="order__item">
            <div className="order__img"><img src={data.image} alt="" /></div>
            <div className="order__body">
                <div className="order__title">{data.name}</div>
                <div className="card__uid">№: {data.id}</div>
                <div className="order__price">{new Intl.NumberFormat('ru-Ru', {
                    style: 'currency',
                    currency: 'UZS',
                }).format(data.price)}</div>
            </div>
        </Link>
    </div>
}
export default AdminCreateO