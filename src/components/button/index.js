import styles from './button.module.css'

export const ButtonType = {
    DEFAULT: 1,
    OUTLINE: 2,
}

function ClassByType( type, isEnabled ){

    if( !isEnabled ){
        return styles.disabled;
    }

    switch( type ){
        case ButtonType.OUTLINE:
            return styles.outline;
        default:
            return styles.default;
    }
}

export default function Button( props ) {

    const { isEnabled, ...rest } = props

    return (
        <button 
            onClick={props.onClick}
            disabled={ !isEnabled }
            className={`${styles.content} ${ ClassByType( props.type, isEnabled ?? true ) }`} 
            {...rest}>
            { props.icon ?? <></> }
            { props.children }
        </button>
    );
}
