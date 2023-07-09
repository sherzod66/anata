import styles from "./modal.module.css"
const ModalDetail = ({ click }) => {
    return <div onClick={click} className={styles.modal}>
    </div >
}
export default ModalDetail