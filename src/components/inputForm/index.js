import styles from './styles.module.css';
import { ErrorMessage } from '@hookform/error-message';
import { useFormContext  } from "react-hook-form"

export default function InputForm( props ) {

    const { register, formState: { errors }, getFieldState } = useFormContext()

    const { params, name, title, ...rest } = props

    const content = {
        width:`${ props.width ?? '50%' }`,
        display: 'flex',
        flexDirection: 'column',
        gap: '2px'
    };

    return (
        <div style={content}>
            <label className={styles.label}>{title}</label>
            <input
            {...register( name, params )}
            className={styles.input}
            aria-invalid={ getFieldState(name).invalid ? "true" : "false"}
            {...rest}/>
            <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => <p style={{fontSize:13, color:"#ec5353"}}>{message}</p> }
            />
        </div>
    )
}