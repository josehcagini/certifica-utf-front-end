import styles from './textarea.module.css'
import { ErrorMessage } from '@hookform/error-message';
import { useFormContext  } from "react-hook-form"

export default function TextArea( props ) {

    const { register, errors, getFieldState } = useFormContext()

    const {  params, name, title, ...rest } = props

    const content = {
        width:`${ props.width ?? '50%' }`,
        display: 'flex',
        flexDirection: 'column'
    };

    return (
        <div className={content}>
            <label className={styles.label}>{title}</label>
            <textarea 
            {...register( name, params ) }
            className={styles.textarea}
            aria-invalid={getFieldState(name).invalid ? "true" : "false"}
            {...rest} />
            <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => <p style={{fontSize:13, color:"#ec5353"}}>{message}</p> }
            />
        </div>
    );
}