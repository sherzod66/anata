import styles from '../comomodity-cards/cards.module.css'
import { Link } from 'react-router-dom'
const Card = ({ card }) => {
    return (
        <div className={styles.nav__column}>
            <Link to={'/card/' + card.id} className={styles.nav__item}>
                <div className={styles.nav__img}>
                    <img src={card.image} />
                </div>
                <div className={styles.nav__text}>{card.name}</div>
                <div className={styles.nav__price}>
                    {new Intl.NumberFormat('ru-Ru', {
                        style: 'currency',
                        currency: 'UZS',
                    }).format(card.price)}
                </div>
            </Link>
        </div>
    )
}
export default Card

