import styles from './style.module.css';

export default function Spinner(props){
    const style = props.style ?? {};
    return (
        <div className={styles.spinner} style={style} />
    )
}