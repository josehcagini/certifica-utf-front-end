import styles from './textarea.module.css'
import { ErrorMessage } from '@hookform/error-message';
import { useFormContext  } from "react-hook-form"

export default function TextAreaForm( props ) {

    const { register, formState : { errors }, getFieldState } = useFormContext()

    const {  params, name, title, ...rest } = props

    const content = { //não funciona, mas também não afeta o estilo
        // verificar se precisa adicionar ao css
        width:`${ props.width ?? '50%' }`,
        display: 'flex',
        flexDirection: 'column'
    };

    return (
        <div >
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