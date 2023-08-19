import { useState } from 'react'
import styles from './editModal.module.css'
import { changeValue } from './changeValue'
const EditModal = ({ cards }) => {
	const [defaultV, setDefaultV] = useState(cards)
	const handelSubmit = (e) => {
		e.preventDefault()
		changeValue(defaultV, defaultV.id)
	}
	return <div id='editM' className={styles.modal}>
		<form onSubmit={handelSubmit}>
			<label htmlFor="name">Name</label>
			<input type="text" onChange={(e) => setDefaultV(prev => ({ ...prev, name: e.target.value }))} name='name' id='name' defaultValue={defaultV.name} className={styles.inputB} />
			<label htmlFor="name">Description</label>
			<textarea type="text" onChange={(e) => setDefaultV(prev => ({ ...prev, description: e.target.value }))} name='name' id='name' className={styles.inputB} defaultValue={defaultV.description}></textarea>
			<div className={styles.number_input}>
				<div className={styles.modal_column}>
					<label htmlFor="quanty">Quanty</label>
					<input onChange={(e) => setDefaultV(prev => ({ ...prev, wasQuanty: e.target.value, quanty: e.target.value }))} type="number" name='quanty' id='quanty' defaultValue={defaultV.wasQuanty} />
				</div>
				<div className={styles.modal_column}>
					<label htmlFor="cast_price">Cast price</label>
					<input onChange={(e) => setDefaultV(prev => ({ ...prev, castPrice: e.target.value }))} type="number" name='price' id='cast_price' defaultValue={defaultV.castPrice} />
				</div>
				<div className={styles.modal_column}>
					<label htmlFor="price">Price</label>
					<input onChange={(e) => setDefaultV(prev => ({ ...prev, price: e.target.value }))} type="text" name='price' id='price' defaultValue={defaultV.price} />
				</div>
			</div>
			<button type='submit'>Edit</button>
		</form>
	</div>
}
export default EditModal