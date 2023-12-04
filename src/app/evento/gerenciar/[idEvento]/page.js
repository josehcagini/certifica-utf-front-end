'use client'
import InputForm from "@/components/inputForm";
import ItemList from "@/components/itemList";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import style from '../styles.module.css'
import eventStyle from './styles.module.css'
import EventMemberSchema from "@/helper/validator/schema/EventMemberSchema";
import Button, { ButtonType } from "@/components/button";
import { buildInit } from "@/app/api/utils/apiUtils";
import { useSession } from "next-auth/react";

export default function Index(props) {
    
    const [evento, setEvento] = useState({});
    const [participantes, setParticipantes] = useState([]);
    const idEvento = useParams().idEvento;

    const session = useSession();

    const syncData = async () => {

       // TODO rever isso, esta sendo usando apenas porque o session estar com problema
        if( session.status === 'loading' ){
            return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/evento/${idEvento}`, buildInit( session ) );

        if ( res.status != 200 ) {
            alert('Erro ' + res.status + ': ' + res.statusText)
            return;
        }

        const data = await res.json();
        const event = data;
        const participantes = data.participants;

        setEvento(event);
        setParticipantes(participantes);
    }

    useEffect(() => {
        syncData();
    }, [session.status]);

    const methods = useForm();

    const onSubmit = async (data) => {

        const body = {
            idEvent: idEvento,
            email: data.email
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/evento/participante`, buildInit( session, "POST", body ) );

        if (res.status == 201) {
            const data = await res.json();
            console.log(data)
            await syncData();
        }
        else if (res.status == 400) {
            alert('Usuário não encontrado');
        }
        else {
            alert('Erro ' + res.status + ': ' + res.statusText)
        }
    }

    const removeMember = async (idParticipante) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/evento/participante/${idEvento}/${idParticipante}`, buildInit( session, "DELETE" ) );
        
        if (res.status == 200) {
            await syncData();
        } else {
            alert('Erro ' + res.status + ': ' + res.statusText)
        }
    }



    return (
        <div className="main">
            <h1>Evento</h1>
            <p><b>Nome:</b> {evento.name}</p>
            <p><b>Data de Início:</b> {new Date(evento.dateStart).toLocaleDateString()}</p>
            <p><b>Data de Encerramento: </b>{new Date(evento.dateEnd).toLocaleDateString()}</p>
            <p><b>Carga Horária:</b> {evento.workload}</p>
            <p><b>Informações: </b>{evento.informations}</p>
            <p><b>Organizador do Evento: </b>{evento.nrUuidAccountable}</p>
            <p><b>Local: </b>{evento.idLocal}</p>
            <hr style={{ width: '100%' }} />
            <FormProvider {...methods}>
                <h2>Adicionar Participantes</h2>
                <form className={eventStyle.inputGroup} onSubmit={methods.handleSubmit(onSubmit)}>
                    <InputForm
                        params={EventMemberSchema.email}
                        type="email"
                        title="Email"
                        name="email"
                        placeholder="Digite o email"
                    />
                    <Button
                        onClick={methods.handleSubmit(onSubmit)}
                        disabled={false}
                    >Adicionar</Button>
                </form>
            </FormProvider>
            <div className={style.grid}>
                {
                    participantes.map(participante => {
                        return (
                            <ItemList
                                key={participante.nrUuid}
                                title={participante.name}
                                subtitle={participante.email}
                                buttonTitle="Remover"
                                buttonStyletype={ButtonType.DANGER}
                                onClick={() => { removeMember(participante.nrUuid) }}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}