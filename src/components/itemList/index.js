import Button from '../button';
import styles from './styles.module.css';
export default function ItemList(props) {
    const { title, subtitle, onClick, buttonTitle } = props;
    return (
        <div className={styles.itemList}>
            <div className={styles.itemListContent}>
                <p className={styles.title}>
                    {title}
                </p>
                <p className={styles.subtitle}>
                    {subtitle}
                </p>
            </div>
            <div>
                <Button
                    onClick={onClick}
                    isEnabled={true}
                >
                    {buttonTitle}
                </Button>
            </div>
        </div>
    )
}