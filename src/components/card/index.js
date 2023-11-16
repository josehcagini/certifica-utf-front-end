import styles from "./card.module.css"


export default function Card (props) {
    return(
     
        <a href={props.link} className={styles.card}>
          <div className={styles.cardImage}>
            {props.icon}
          </div>
          <div className={styles.cardContent}>
            <p>{props.title}</p>
          </div>
        </a>
    )
}