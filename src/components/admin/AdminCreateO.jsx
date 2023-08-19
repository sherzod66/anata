import { Link, useNavigate } from "react-router-dom"
import { loazyLoadImage } from "../loazy load/loazyImage"
import { useEffect, useState } from "react"
import { GetCard } from "../services/service"
import { firebaseConfig } from "../firebase-config/firebaseConfig";
import { getDatabase, ref } from "firebase/database";
import { initializeApp } from "firebase/app";
import styles from './cerateOrder.module.css'
import EditModal from "../edit modal/EditModal";
import { deleteCard } from "../edit modal/changeValue";
const app = initializeApp(firebaseConfig);
const firebaseDb = getDatabase(app);
const dbRef = ref(getDatabase(app));
const AdminCreateO = ({ }) => {
    const [data, setData] = useState(false)
    const [show, setShow] = useState({ open: false, card: '' })
    const navigate = useNavigate()
    useEffect(() => {
        GetCard(dbRef, setData, 'cards')
    }, [])
    useEffect(() => loazyLoadImage(), [data])
    const modalW = (e) => {
        if (!e.target.closest('#editM')) {
            setShow(prev => ({ ...prev, open: !prev.open, card: '' }))
        }
    }
    const handelDelete = (id, name) => {
        const del = confirm('Are you sure you want to delete the card?')
        console.log(del);
        if (del) {
            deleteCard(id, name).then(() => navigate(0))
        }
    }
    console.log(data);
    return <div className={styles.cards}>
        {show.open ? <div onClick={modalW} className={styles.modal_wrapper}><EditModal cards={show.card} /></div> : ''}
        <div className={styles.cards__con}>
            <div className={styles.cards__bar}>
                <ul className={styles.cards__bar_row}>
                    <li>Name</li>
                    <li>Quanty</li>
                    <li>Ordered</li>
                    <li>Price</li>
                    <li>Edit</li>
                    <li>Delete</li>
                </ul>
            </div>
            {data ? data.map(card => (
                <div key={card.id} className={styles.cards__column}>
                    <ul className={styles.cards__list}>
                        <li>
                            <Link to={'/card/' + card.id} className={styles.cards__name_image}>
                                <p>{card.name}</p>
                                <div className={styles.cards__img}><img data-src={card.image} src='https://www.erdemdavetiye.com/images/resim-yoktur.jpg' alt={card.name} /></div>
                            </Link></li>
                        <li><div className={styles.cards__quantyV}>{card.quanty}</div></li>
                        <li><div className={styles.cards__ordersV}>{card.orders}</div></li>
                        <li><div className={styles.cards__priceV}>{card.price}</div></li>
                        <li onClick={() => setShow(prev => ({ ...prev, open: !prev.open, card: card }))}><div className={styles.cards__edit}>Edit</div></li>
                        <li id={card.id} onClick={() => handelDelete(card.id, card.imageName)}><div className={styles.cards__delete}>Delete</div></li>
                    </ul>
                </div>
            ))
                : <p style={{ color: '#ffffff' }}>Еще нет пригласительных карт</p>
            }

        </div>

    </div>
}
export default AdminCreateO

{/* <Link to={'/card/' + data.id} className="order__item">
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
</Link> */}