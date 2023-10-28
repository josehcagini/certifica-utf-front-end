//Renderizar a página certa de acordo com o stepContent
import styles from './conteudo.module.css'
import DadosEvento from './dadosEvento'
import Button, { ButtonType } from '@/components/button'
import CriarCertificado from './criarCertificado'
import Finalizar from './finalizar'
import EventObject from '@/objects/event/EventObject'

import { useForm, FormProvider } from "react-hook-form"
import { fetchData } from '@/app/api/utils/apiUtils'
import { useState } from 'react'

const StepsEnum = {
    DADOS_EVENTO: 1,
    CRIAR_CERTIFICADO: 2,
    FINALIZAR: 3,
};

function Conteudo({ stepContent, updateStep }) {
    const [eventObject, setEventObject] = useState(Object.assign({}, EventObject));
    const [documentHTML, setDocumentHTML] = useState('');

    function renderContent() {
        switch (stepContent) {
            case StepsEnum.DADOS_EVENTO:
                return <DadosEvento/>
            case StepsEnum.CRIAR_CERTIFICADO:
                return <CriarCertificado documentHTML={documentHTML} eventObject={eventObject} />
            case StepsEnum.FINALIZAR:
                return <Finalizar documentHTML={documentHTML} eventObject={eventObject} />
            default:
                return <DadosEvento eventObject={eventObject} />
        }
    }

    function onNext() {

        if (stepContent == StepsEnum.FINALIZAR) {
            console.log('enviar para o backend');
            // TODO pegar o HTML gerado (documentHTML) e enviar para o backend junto dos dados do evento

            const response = async () => {
                const response = await fetchData(
                    `${API_BASE_URL}/eventos/novo`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(eventObject)
                    }
                )
            }
            if (response.ok) {
                location.href = '/';
            } else {
                return (
                    alert("erro")
                )
            }

            return;
        }

        updateStep(++stepContent);
        return;
 
        // TODO Apresentar erro 

    }

    function onPrevious() {
        // TODO implementar
        updateStep(--stepContent);
    }

    function onSubmit( date ){
        console.log(date)
        setEventObject( date )
        onNext()
    }

    // TODO é possível passar os default values para o useForm, vai ser util no caso de edição do evento 
    const methods = useForm()

    return (
        <div className={styles.content}>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    {renderContent()}
                    <div className={styles.buttonContent}>
                        <Button type="submit" isEnabled={true}>
                            {stepContent == StepsEnum.FINALIZAR ? 'Finalizar' : 'Próximo'}
                        </Button>
                        {stepContent != StepsEnum.DADOS_EVENTO &&
                            <Button type="button" isEnabled={true} onClick={() => onPrevious()} styleType={ButtonType.OUTLINE}>
                                Voltar
                            </Button>
                        }
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}


export default Conteudo