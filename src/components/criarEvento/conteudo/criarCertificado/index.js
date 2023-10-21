import styles from './criarCertificado.module.css'
import PreviaCertificado from '../../previaCertificado'
import Input from '@/components/input'
import { useState } from 'react';

export default function CriarCertificado({ setIsValidData }) {
    const [tipoCertificado, setTipoCertificado] = useState(1);
    return (
        <div className={styles.content}>
            <div className={styles.leftContent}>
                <Input type="hidden" title="Modelo do Certificado" /> {/* Alterar para label estilizado */}
                <div className={styles.inputGroup}>
                    <input type="radio" className={styles.radio} name="tipoCertificado" id="tipo1" value="1"  onChange={e => setTipoCertificado(e.target.value)} defaultChecked />
                    <label htmlFor='tipo1' className={styles.label}>Modelo 1</label>
                </div>
                <div className={styles.inputGroup}>
                    <input type="radio" name="tipoCertificado" className={styles.radio}  id="tipo2" value="2" onChange={e => setTipoCertificado(e.target.value)} />
                    <label htmlFor='tipo2' className={styles.label}>Modelo 2</label>
                </div>
                <Input type="file" title="Importar XML" width="fit-content" accept=".xml" />


            </div>
            <div className={styles.rightContent}>
                <PreviaCertificado tipoCertificado={tipoCertificado} />
            </div>
        </div>
    )
}