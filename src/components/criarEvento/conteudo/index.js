//Renderizar a página certa de acordo com o stepContent
import { useState } from 'react'
import styles from './conteudo.module.css'
import DadosEvento from './dadosEvento'
import Button from '@/components/button'
import CriarCertificado from './criarCertificado'
import Finalizar from './finalizar'

const StepsEnum = {
    DADOS_EVENTO: 1,
    CRIAR_CERTIFICADO: 2,
    FINALIZAR: 3,
};

function Conteudo( {stepContent, updateStep } ){

    const [ isValidData, setIsValidData ] = useState( 1 );
    const [ eventObject, setEventObject ] = useState( Object.assign( {}, Event ) );

    function renderContent() {
        switch (stepContent) {
            case StepsEnum.DADOS_EVENTO:
                return <DadosEvento setIsValidData={setIsValidData} eventObject={eventObject} />
            case StepsEnum.CRIAR_CERTIFICADO:
                return <CriarCertificado setIsValidData={setIsValidData} eventObject={eventObject} />
            case StepsEnum.FINALIZAR:
                return <Finalizar eventObject={eventObject} />
            default:
                return <DadosEvento setIsValidData={setIsValidData} eventObject={eventObject}/>
        }
    }

    function onNext() {

        if (stepContent == StepsEnum.FINALIZAR) {
            console.log('enviar para o backend');
            location.href = '/';
            // TODO enviar para o backend
            return;
        }

        if (isValidData) {
            updateStep(++stepContent);
            return;
        }

        // TODO Apresentar erro 

    }

    function onPrevius() {
        // TODO implementar
    }

    return (
        <div className={styles.content}>
            {renderContent()}
            <div className={styles.buttonContent}>
                <Button isEnabled={isValidData} onClick={() => onNext()}>
                    {stepContent == StepsEnum.FINALIZAR ? 'Finalizar' : 'Próximo'}
                </Button>
            </div>
        </div>
    )
}


export default Conteudo