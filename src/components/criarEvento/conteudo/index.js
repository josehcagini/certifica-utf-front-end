//Renderizar a página certa de acordo com o stepContent
import styles from './conteudo.module.css'
import DadosEvento from './dadosEvento'
import Button, { ButtonType } from '@/components/button'
import CriarCertificado from './criarCertificado'
import Finalizar from './finalizar'
import { useForm, FormProvider } from "react-hook-form"

const StepsEnum = {
    DADOS_EVENTO: 1,
    CRIAR_CERTIFICADO: 2,
    FINALIZAR: 3,
};

function Conteudo( {stepContent, updateStep } ){

    function renderContent() {
        switch (stepContent) {
            case StepsEnum.DADOS_EVENTO:
                return <DadosEvento/>
            case StepsEnum.CRIAR_CERTIFICADO:
                return <CriarCertificado/>
            case StepsEnum.FINALIZAR:
                return <Finalizar/>
            default:
                return <DadosEvento />
        }
    }

    function onNext() {

        if (stepContent == StepsEnum.FINALIZAR) {
            console.log('enviar para o backend');
            location.href = '/';
            // TODO enviar para o backend
            return;
        }

        updateStep(++stepContent);
        return;
 
        // TODO Apresentar erro 

    }

    function onPrevius() {
        updateStep(--stepContent);
    }

    function onSubmit( date ){
        console.log(date)
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
                        {
                        stepContent !== StepsEnum.DADOS_EVENTO ? 
                        <Button type="button" onClick={onPrevius} styleType={ ButtonType.OUTLINE }>Voltar</Button> : <></>
                        }
                        <Button type="submit" isEnabled={true}>
                            {stepContent == StepsEnum.FINALIZAR ? 'Finalizar' : 'Próximo'}
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}


export default Conteudo