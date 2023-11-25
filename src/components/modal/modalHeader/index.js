import { AiOutlineCloseCircle } from "react-icons/ai";
import styles from './styles.module.css';
export default function ModalHeader(props) {
    const { title, dismiss } = props;
    return (
        <div className={styles.modalHeader}>
                <p className={styles.title}>{title}</p>
                <button className={styles.button} onClick={dismiss}>
                    <AiOutlineCloseCircle size={24} />
                </button>
        </div>
    )
}