import styles from './button.remove.module.css'

export default function ButtonRemove( props ) {

    const { onClick, children, ...rest } = props

    return (
        <button 
            type="button"
            onClick={onClick}
            className={styles.content}
            {...rest}>
            { children }
        </button>
    );
}