import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { GetCardDetai } from "../services/service"
const Report = ({ data, dbref }) => {
    const [card, setCard] = useState('')
    useEffect(() => {
        GetCardDetai(dbref, setCard, data.cardId)
    }, [])
    console.log(data)
    return <div className="order__column">
        <Link to={'/card/' + data.cardId} className="order__item">
            <div className="order__img"><img src={card.image} alt="" /></div>
            <div className="order__body rp">
                <div className="card__uid">№: {data.id}</div>
                <div className="card__orders">Заказоно пригласительных: {data.quanty} штук</div>
                <div>Вырученная сумма: {new Intl.NumberFormat('ru-Ru', {
                    style: 'currency',
                    currency: 'UZS',
                }).format(data.prepayment)}</div>

                <div className="card__const-price">
                    Прибыли: {new Intl.NumberFormat('ru-Ru', {
                        style: 'currency',
                        currency: 'UZS',
                    }).format(data.prepayment - (+data.quanty * +card.castPrice))}</div>

            </div>
        </Link >
    </div >
}
export default Report