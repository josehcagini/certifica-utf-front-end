import styles from './style.module.css';

export default function Spinner(props){
    console.log(styles)
    const style = props.style ?? {};
    return (
        <div className={styles.spinner} style={style} />
    )
}