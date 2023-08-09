import styles from './ticket.module.css'
import { useContext, useEffect, useState } from 'react'
import { GetOrderTicket } from '../services/service'
import { AuthContext } from '../context/AuthProvider'
import TicketHtml from './TicketHtml'

const Ticket = () => {
    const [sum, setSum] = useState('')
    const [ticket, setTicket] = useState(false)
    const { usUid, setUsUid } = useContext(AuthContext)
    useEffect(() => {
        if (!usUid) return
        GetOrderTicket(setTicket, usUid.uid)
    }, [usUid])
    useEffect(() => {
        if (!ticket.cardInfo) return
        let sum = 0
        for (let index = 0; index < ticket.cardInfo.length; index++) {
            sum += +ticket.cardInfo[index].price;
            setSum(sum)
        }
    }, [ticket])
    return <div className={styles.ticket}>
        <div className={styles.ticket__container}>
            <div className={styles.ticket__body}>
                <div className={styles.ticket__title}>Anatasam</div>
                <div className={styles.ticket__row}>
                    {ticket ?
                        <TicketHtml ticket={ticket} sum={sum} />
                        : <div className={styles.load}><img className={styles.load} src='/5.gif' /></div>}
                </div>
            </div>
        </div>
    </div>
}
export default Ticket