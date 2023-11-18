//Renderizar a página certa de acordo com o stepContent
import styles from './conteudo.module.css'
import DadosEvento from './dadosEvento'
import Button, { ButtonType } from '@/components/button'
import CriarCertificado from './criarCertificado'
import Finalizar from './finalizar'
import EventObject from '@/objects/event/EventObject'
import CertificateObject from '@/objects/certificate/CertificateObject'

import { useForm, FormProvider } from "react-hook-form"
import { fetchData } from '@/app/api/utils/apiUtils'
import { useState } from 'react';
import gerarCertificado from '@/services/certificado/geradorDeCertificado';
import { useSession } from 'next-auth/react'
import { modelosCertificado } from '@/app/certificado/page'

const StepsEnum = {
    DADOS_EVENTO: 1,
    CRIAR_CERTIFICADO: 2,
    FINALIZAR: 3,
};

function Conteudo({ stepContent, updateStep }) {
    const [eventObject, setEventObject] = useState(Object.assign({}, EventObject));
    const [certificateObject, setCertificateObject] = useState(Object.assign({}, CertificateObject));
    const session = useSession();

    function renderContent() {
        switch (stepContent) {
            case StepsEnum.DADOS_EVENTO:
                return <DadosEvento />
            case StepsEnum.CRIAR_CERTIFICADO:
                return <CriarCertificado certificateObject={certificateObject} eventObject={eventObject} />
            case StepsEnum.FINALIZAR:
                return <Finalizar certificateObject={certificateObject} eventObject={eventObject} />
            default:
                return <DadosEvento eventObject={eventObject} />
        }
    }


    function onPrevious() {
        // TODO implementar
        updateStep(--stepContent);
    }

    function setObjectsByStepContent(date, stepContent) {
        // Separar do código principal do onSubmit
        // para melhor visualização do código
        // Essa função evita a sobreposição dos dados
        // já que o date é um objeto com todos os dados das steps
        switch (stepContent) {
            case StepsEnum.DADOS_EVENTO:
                setEventObject(
                    Object.assign({}, {
                        name: date.name,
                        dateStart: date.dateStart,
                        dateEnd: date.dateEnd,
                        dates: date.dates,
                        workload: date.workload,
                        informations: date.informations,
                    })
                ); // É necessário utilizar o Object.assign porque,
                // caso o usuário retorne para a step de dados do evento
                // o  objeto date incluirá os dados das outras steps.
                break;
            case StepsEnum.CRIAR_CERTIFICADO:
                setCertificateObject(
                    Object.assign({}, {
                        modelo: date.tipoCertificado,
                        personalData: {
                            instituicao: date.instituicao,
                            logo: date.logo[0],
                            local: date.local,
                            backgroundImage: date.backgroundImage[0]
                        }
                    })
                );
                break;
            default:
                break;
        }
        return date; // Caso seja necessário pra debug
    }

    async function onNext() {

        if (stepContent == StepsEnum.FINALIZAR) {
            console.log('enviar para o backend');
            const template = gerarCertificado({
                eventObject: eventObject,
                certificateObject: certificateObject,
                organizador: session?.data?.user?.name
            })

            const body = {
                event: {
                    name: eventObject.name,
                    dateStart: eventObject.dateStart,
                    dateEnd: eventObject.dateEnd,
                    dates: eventObject.dates,
                    workload: eventObject.workload,
                    informations: eventObject.informations,
                    nomeEmissor: session?.data?.user?.name,
                    certificate:
                    {
                        htmlModel: template,
                        modelo: certificateObject.modelo,
                        personalData:
                            certificateObject.modelo === modelosCertificado.UTFPR ? null :
                                {
                                    instituicao: certificateObject.personalData.instituicao,
                                    local: certificateObject.personalData.local,
                                    logo: certificateObject.personalData.logo, // object File  
                                    backgroundImage: certificateObject.personalData.backgroundImage // object File
                                }
                    }
                }
            }

            console.log(body)

            const API_BASE_URL = process.env.API_BASE_URL;
            /*const response = await fetchData( //endpoint ainda não implementado
                `${API_BASE_URL}/eventos/novo`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        
                    },
                    body: JSON.stringify(body)
                }
            )
            if (response.status === 201) {
                const json = await response.json();
                console.log(json);
                const { id } = json;
                location.href = `/evento/${id}`;
            } else {
                return (
                    alert("erro")
                )
            }*/
            console.log('aguardando resposta do backend')
            return;
        }

        updateStep(++stepContent);
        return;

        // TODO Apresentar erro 
    }

    function onSubmit(date) {
        setObjectsByStepContent(date, stepContent);
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
                            <Button type="button" isEnabled={true} onClick={() => onPrevious()} styletype={ButtonType.SECONDARY}>
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