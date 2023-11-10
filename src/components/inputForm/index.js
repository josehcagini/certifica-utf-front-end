import styles from './styles.module.css';
import { ErrorMessage } from '@hookform/error-message';
import { useFormContext  } from "react-hook-form";

export default function 
InputForm( props ) {

    const { register, formState: { errors }, getFieldState } = useFormContext()

    const { params, name, title, type, ...rest} = props

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
            <label className={styles.label} htmlFor={props.id}>{title}</label>
            <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => <p style={{fontSize:13, color:"#ec5353"}}>{message}</p> }
            />
            <input
            {...register( name, params )}
            className={`${styles.input} ${isCheckOrRadio(type) ? styles.inputCheck : ''}`}
            aria-invalid={ getFieldState(name).invalid ? "true" : "false"}
            type={type}
            {...rest}/>
            
        </div>
    )
}