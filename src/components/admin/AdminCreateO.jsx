import { Link } from "react-router-dom"
import { loazyLoadImage } from "../loazy load/loazyImage"
import { useEffect, useState } from "react"
const AdminCreateO = ({ data }) => {

    return <div className="order__column">
        <Link to={'/card/' + data.id} className="order__item">
            <div className="order__img">
                <img data-src={data.image} src='https://www.erdemdavetiye.com/images/resim-yoktur.jpg' alt="" />
            </div>
            <div className="order__body">
                <div id="nameP" className="order__title">{data.name}</div>
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