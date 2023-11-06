import styles from './criarCertificado.module.css';
import PreviaCertificado from '../../previaCertificado'
import Input from '@/components/input'
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import InputForm from '@/components/inputForm';
import CertificateSchema from '@/helper/validator/schema/CertificateSchema';

export default function CriarCertificado({ eventObject, certificateObject }) {
    const [tipoCertificado, setTipoCertificado] = useState('1');
    const [instituicao, setInstituicao] = useState('');
    const [local, setLocal] = useState('');
    const [logo, setLogo] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState(false);

    const session = useSession();
    const organizador = session?.data?.user?.name;
    const [data, setData] = useState(Object.assign({},
        { eventObject: eventObject },
        { organizador: organizador },
        { certificateObject: certificateObject }
    ));

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
        if (!local){
            setLocal('Dois Vizinhos- PR');
        }
        setData(Object.assign({},
            { eventObject: eventObject },
            { organizador: organizador },
            {
                certificateObject: {
                    modelo: tipoCertificado,
                    personalData: {
                        instituicao: instituicao,
                        logo: logo,
                        local: local,
                        backgroundImage: backgroundImage
                    }                
                }
            }
        ));
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
                <Input name="modeloCertificado" type="hidden" title="Modelo do Certificado" /> {/* Alterar para label estilizado */}
                <InputForm
                    type="radio"
                    name="tipoCertificado"
                    title="Modelo 1 (personalizável)"
                    id="tipo1" value='1'
                    width="100%"
                    defaultChecked={true}
                    params={CertificateSchema.modelo}
                    onChange={e => setTipoCertificado(e.target.value)}
                //continuar utilizando para alterar a prévia

                />
                <InputForm
                    type="radio"
                    name="tipoCertificado"
                    title="Modelo 2 (padrão UTFPR)"
                    id="tipo2" value='2'
                    width="100%"
                    params={CertificateSchema.modelo}
                    onChange={e => setTipoCertificado(e.target.value)}
                />
                {/*<div className={styles.inputGroup}>
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

                        <InputForm
                            type="text"
                            name="instituicao"
                            title="Instituição (opcional)"
                            placeholder="Instituição"
                            width="80%"
                            params={CertificateSchema.instituicao}
                            onChange={e => setInstituicao(e.target.value)} />
                        <InputForm
                            type="file"
                            name="logo"
                            title="Logo da Instiuição ou evento"
                            accept="image/*"
                            width="80%"
                            params={CertificateSchema.logo}
                            onChange={e => { handleUploadLogo(e) }} />
                        <InputForm
                            type="text"
                            name="local"
                            title="Cidade e Estado"
                            placeholder="Ex: Dois Vizinhos - PR"
                            width="80%"
                            params={CertificateSchema.local}
                            onChange={e => setLocal(e.target.value)} />
                        <InputForm type="file"
                            name="backgroundImage"
                            title="Inserir imagem de fundo"
                            width="80%"
                            accept="image/*"
                            params={CertificateSchema.backgroundImage}
                            onChange={e => {
                                handleUploadBG(e);
                            }} />
                    </>
                }
                {tipoCertificado === '3' && //Não utilizar por enquanto
                    <Input type="file" disabled={tipoCertificado !== 3} title="Importar XML" width="fit-content" accept=".xml" />
                }


            </div>
            <div className={styles.rightContent}>
                <p>Prévia do Certificado</p>
                <PreviaCertificado data={data} />
            </div>
        </div >
    )
}