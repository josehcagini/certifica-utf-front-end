import styles from './page.module.css'

import ButtonLogin from './button';

export default function Login() {
    return(
      <div className={styles.main} id='login'>
        <div className={styles.content}>
            <div className={styles.leftContent}>
              <div className={styles.informations}>
                <div>
                    <div className={styles.title}>
                      Certificados de Conquista,<br/>
                      Conectando Sonhos e Realizações!
                    </div>
                    <img className={styles.imageInformations} src='/images/computer_peopple.png'/>
                </div>
              </div>
            </div>
            <div className={styles.rightContent}>
              <div className={styles.subRightContent}>
                  <div className={styles.logoContent}>
                    <img src='/images/logo.png' width={50} height={50}/>
                    <div className={styles.nameCompany}>UTFCertificado</div>
                  </div>
                  <div className={styles.loginTitle}>Entre</div>
                  <ButtonLogin/>
              </div>
            </div>
        </div>
      </div>
    )
}