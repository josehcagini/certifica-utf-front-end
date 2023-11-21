export default function Modal(props){
    const { title, children, dismiss } = props;

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={onClick}>&times;</span>
                <h1>{title}</h1>
                <div>
                    {children}
                </div>
                <button onClick={dismiss}>{buttonTitle}</button>
            </div>
        </div>
    )
}