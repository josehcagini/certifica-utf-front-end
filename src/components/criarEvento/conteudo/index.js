//Renderizar a página certa de acordo com o stepContent
import { useState } from 'react'
import styles from './conteudo.module.css'
import DadosEvento from './dadosEvento'
import Button from '@/components/button'

function CriarCertificado(){
    return(
        <div className="">

        </div>
    )
}

function Finalizar(){
    return(
        <div className="">

        </div>
    )
}

const StepsEnum = {
    DADOS_EVENTO: 1,
    CRIAR_CERTIFICADO: 2,
    FINALIZAR: 3,
};

function Conteudo({stepContent, updateStep }){

    const [ isValidData, setIsValidData ] = useState( false );

    function renderContent(){
        switch(stepContent){
            case StepsEnum.DADOS_EVENTO:
                return <DadosEvento setIsValidData={setIsValidData} />
            case StepsEnum.CRIAR_CERTIFICADO:
                return <CriarCertificado />
            case StepsEnum.FINALIZAR:
                return <Finalizar />
            default:
                return <DadosEvento />
        }
    }

    function onNext(){

        if( stepContent == StepsEnum.FINALIZAR ){
            // TODO enviar para o backend
            return;
        }

        if( isValidData ){
            updateStep( ++stepContent );
            return;
        } 

        // TODO Apresentar erro 

    }

    function onPrevius() {
        // TODO implementar
    }

    return(
        <div className={styles.content}>
            {renderContent()}
            <div className={styles.buttonContent}>
                <Button isEnabled={isValidData} onClick={ () => onNext() }>Proximo</Button>
           </div>
        </div>
    )
}


export default Conteudo