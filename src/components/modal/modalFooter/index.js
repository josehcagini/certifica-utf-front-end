import Button, { ButtonType } from '@/components/button';
import styles from './styles.module.css';
export default function ModalFooter({ dismiss, buttonTitle, onClick }) {
    return (
        <div className={styles.modalFooter}>
            <Button
                styletype={ButtonType.DANGER}
                isEnabled={true}
                onClick={dismiss}>Fechar</Button>
            {(buttonTitle && onClick) &&
                <Button
                    styletype={ButtonType.DEFAULT}
                    isEnabled={true}
                    onClick={onClick}>{buttonTitle}</Button>
            }
        </div>
    )
}