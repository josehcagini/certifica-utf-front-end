import styles from './textarea.module.css'

export default function TextArea( props ) {

    const content = {
        width:`${ props.width ?? '50%' }`,
        display: 'flex',
        flexDirection: 'column'
    };

    return (
        <div className={content}>
            <label className={styles.label}>{props.title}</label>
            <textarea 
            className={styles.textarea}
            onChange={props.onChange}
            {...props} />
        </div>
    );
}