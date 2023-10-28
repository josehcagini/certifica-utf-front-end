import styles from './styles.module.css';

export default function Input( props ) {

    const { title, width, onChange, ...rest } = props

    const content = {
        width:`${ width ?? '50%' }`,
        display: 'flex',
        flexDirection: 'column',
        gap: '2px'
    };

    return (
        <div style={content}>
            <label className={styles.label}>{title}</label>
            <input
            onChange={onChange ?? null}            
            className={styles.input}
            {...rest}/>
        </div>
    )
}