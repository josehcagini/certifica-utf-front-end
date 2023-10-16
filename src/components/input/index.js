import styles from './styles.module.css';

export default function Input(props) {

    const content = {
        width:`${ props.width ?? '50%' }`,
        display: 'flex',
        flexDirection: 'column'
    };

    return (
        <div style={content}>
            <label className={styles.label}>{props.title}</label>
            <input
                onChange={props.onChange ?? null}
                className={styles.input}
                {...props}            
                />
        </div>
    )
}