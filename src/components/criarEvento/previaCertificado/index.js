import styles from './certificado.module.css'

//Alterar para exibir em formato PDF/html em vez de imagem
export default function PreviaCertificado({tipoCertificado}) {
  return <img className={styles.certificado} src={`/images/certificadoModelo${tipoCertificado}.png`} alt={'Modelo'+ tipoCertificado} />
}