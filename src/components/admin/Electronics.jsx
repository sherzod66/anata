import { useEffect, useState } from 'react';
import styles from './electronic.module.css'
import { GetElectronicDate, RemoveElectronic } from "../services/getElectronicD";
import { BsFillTrash2Fill } from "react-icons/bs";
import { Link } from 'react-router-dom';
const Electronics = () => {
	const [electronic, setElectro] = useState(false);
	useEffect(() => {
		GetElectronicDate('electronic', setElectro)
	}, [])

	const removeElectronic = (event) => {
		const search = electronic.find(item => item.id === event.target.id);
		const searchId = electronic.findIndex(item => item.id === event.target.id);
		RemoveElectronic(search.id, search.videoName)
		const item = [...electronic];
		item.splice(searchId, 1)
		setElectro(item)
	}
	console.log(electronic)
	return <div className={styles.electronic}>
		<div className={styles.electronic__row}>
			{electronic ? electronic.map(elment => (
				<div key={elment.id} className={styles.electronic__column}>
					<div className={styles.electronic__item}>
						<Link to={`/electronic/${elment.id}`} className={styles.electronic__name}>{elment.name}</Link>
						<div id={elment.id} onClick={removeElectronic} className={styles.electronic__remove}>Delete</div>
					</div>
				</div>
			)) : ''}
		</div>
	</div>
}

export default Electronics