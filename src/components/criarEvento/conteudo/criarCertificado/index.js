import styles from './criarCertificado.module.css';
import stylesDadosEvento from '../dadosEvento/dados.module.css';
import PreviaCertificado from '../../previaCertificado'
import Input from '@/components/input'
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function CriarCertificado({ setIsValidData, eventObject, documentHTML }) {
    const [tipoCertificado, setTipoCertificado] = useState("1");
    const [instituicao, setInstituicao] = useState('');
    const [local, setLocal] = useState('');
    const [logo, setLogo] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState(false);

    const session = useSession();
    const organizador = session?.data?.user?.name;
    const [data, setData] = useState(Object.assign({}, eventObject, { organizador: organizador },
        {
            personalData: {
                instituicao: instituicao,
                local: local,
                backgroundImage: backgroundImage,
            }
        }, { tipoCertificado: tipoCertificado }));



    const handleUploadBG = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];
        if (!file) {
            setBackgroundImage(false);
            return;
        }
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setBackgroundImage(reader.result);
        }
    }

    const handleUploadLogo = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];
        if (!file) {
            setLogo(false);
            return;
        }
        reader.readAsDataURL(file)
        reader.onload = () => {
            setLogo(reader.result);
        }
    }


    useEffect(() => {
        setData(Object.assign({}, eventObject, { local: local }, { organizador: organizador },
            {
                personalData: {
                    instituicao: instituicao,
                    backgroundImage: backgroundImage,
                    logo: logo
                }
            }, { tipoCertificado: tipoCertificado }));
    }, [tipoCertificado, instituicao, local, backgroundImage, logo]);

    useEffect(() => {
        if (tipoCertificado !== '1') {
            setBackgroundImage(false);
            setLogo(false);
        }
    }, [tipoCertificado])


    return (
        <div className={styles.content}>
            <div className={styles.leftContent}>
                <Input type="hidden" title="Modelo do Certificado" /> {/* Alterar para label estilizado */}
                <div className={styles.inputGroup}>
                    <input type="radio" className={styles.radio} name="tipoCertificado" id="tipo1" value="1" onChange={e => setTipoCertificado(e.target.value)} defaultChecked />
                    <label htmlFor='tipo1' className={styles.label}>Modelo 1 (personalizável)</label>
                </div>
                <div className={styles.inputGroup}>
                    <input type="radio" name="tipoCertificado" className={styles.radio} id="tipo2" value="2" onChange={e => setTipoCertificado(e.target.value)} />
                    <label htmlFor='tipo2' className={styles.label}>Modelo 2 (padrão UTFPR)</label>
                </div>{/*
                Não utilizar por enquanto
                <div className={styles.inputGroup}>
                    <input type="radio" name="tipoCertificado" className={styles.radio} id="tipo3" value="3" onChange={e => setTipoCertificado(e.target.value)} />
                    <label htmlFor='tipo3' className={styles.label}>Modelo Próprio</label>
    </div>*/}
                {
                    tipoCertificado === '1' &&
                    <>
                        <Input type="text" title="Instituição (opcional)" placeholder="Instituição" width="fit-content" onChange={e => setInstituicao(e.target.value)} />
                        <Input type="file" title="Logo da Instiuição ou evento" accept="image/*" width="fit-content" onChange={e => { handleUploadLogo(e) }} />
                        <Input type="text" title="Local" placeholder="Local do evento" width="fit-content" onChange={e => setLocal(e.target.value)} />
                        <Input type="file" title="Inserir imagem de fundo" width="fit-content" accept="image/*" onChange={e => {
                            handleUploadBG(e);
                        }} />
                    </>
                }
                {tipoCertificado === '3' &&
                    <Input type="file" disabled={tipoCertificado !== '3'} title="Importar XML" width="fit-content" accept=".xml" />
                }


            </div>
            <div className={styles.rightContent}>
                <p>Prévia do Certificado</p>
                <PreviaCertificado data={data} />
            </div>
        </div >
    )
}