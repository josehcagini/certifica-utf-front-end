import styles from './page.module.css'

export default function NotFound(){
    return (
        <div className={styles.flexCenter}>
            <h1>Pagina não encontrada</h1>
            <hr width='50%'/>
            <a href='/' style={{textDecoration:'underline', color: '#3498db'}}>Voltar para a Home</a>
        </div>
    )
}