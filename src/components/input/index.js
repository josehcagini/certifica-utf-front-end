import styles from './styles.module.css';

export default function Input( props ) {

    const { params, name, onChange, title, type, ...rest} = props

    const isCheckOrRadio = (type) => {
        if (type === 'checkbox' || type === 'radio') {
            return true;
        }
        return false;
    }



    const content = {
        width:`${ props.width ?? '50%' }`,
        display: 'flex',
        justifyContent: `${ isCheckOrRadio(type) ? 'flex-end' : 'normal' }`,
        flexDirection: `${ isCheckOrRadio(type) ? 'row-reverse' : 'column' }`,
        gap: '2px'
    };

    return (
        <div style={content}>
            <label className={styles.label}>{title}</label>
            <input
            onChange={onChange ?? null}            
            className={styles.input}
            type={type ?? 'text'}
            {...rest}/>
        </div>
    )
}