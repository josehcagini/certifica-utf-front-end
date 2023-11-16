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
import { fetchData } from "@/app/api/utils/apiUtils";

export default function Index(props) {
    const [evento, setEvento] = useState({});
    const [participantes, setParticipantes] = useState([]);
    const idEvento = useParams().idEvento;
    const syncData = async () => {
        const res = await fetchData('http://localhost:8080/api/evento/' + idEvento);
        if (res.status != 200) {
            alert('Erro ' + res.status + ': ' + res.statusText)
            return;
        }
        const data = await res.json();
        const participantes_ = data.participantes;
        const event = data.event;
        setEvento(event);
        setParticipantes(participantes_);
    }

    useEffect(() => {
        syncData();
    }, []);

    const methods = useForm();

    const onSubmit = async (data) => {
        console.log(data)
        const res = await fetch('http://localhost:8080/api/participante', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (res.status == 201) {
            const data = await res.json();
            console.log(data)
            await syncData();
        }
        else if (res.status == 400) {
            const data = await res.json();
            console.log(data)
            alert('Usuário não encontrado');
        }
        else {
            alert('Erro ' + res.status + ': ' + res.statusText)
        }
    }

    const removeMember = async (idParticipante) => {
        const res = await fetch('http://localhost:8080/api/participante/' + idParticipante, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.status == 200) {
            await syncData();
        } else {
            alert('Erro ' + res.status + ': ' + res.statusText)
        }
    }



    return (
        <div className="main">
            <h1>Evento</h1>
            <p><b>Nome:</b> {evento.dsNome}</p>
            <p><b>Data de Início:</b> {new Date(evento.dhInicio).toLocaleDateString()}</p>
            <p><b>Data de Encerramento: </b>{new Date(evento.dhFim).toLocaleDateString()}</p>
            <p><b>Carga Horária:</b> {evento.nrCargaHoraria}</p>
            <p><b>Informações: </b>{evento.dsInformacoes}</p>
            <p><b>Organizador do Evento: </b>{evento.nrUuidResponsavel}</p>
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
                                key={participante.nrUuidParticipante}
                                title={participante.dsNome}
                                subtitle={participante.dsEmail}
                                buttonTitle="Remover"
                                buttonStyletype={ButtonType.DANGER}
                                onClick={() => { removeMember(participante.nrUuidParticipante) }}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}