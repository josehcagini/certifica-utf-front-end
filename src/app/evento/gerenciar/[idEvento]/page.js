'use client'
import InputForm from "@/components/inputForm";
import ItemList from "@/components/itemList";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import style from '../styles.module.css'
import EventMemberSchema from "@/helper/validator/schema/EventMemberSchema";

const db = [
    {
        idEvento: 1,
        dsNome: 'Evento 1',
        dhInicio: "2023-11-08T20:00",
        dhFim: "2023-11-09T18:00",
        nrCargaHoraria: 10,
        dsInformacoes: 'Informações do evento 1',
        nrUuidResponsavel: 1,
        idLocal: 1
    },
    {
        idEvento: 2,
        dsNome: 'Evento 2',
        dhInicio: "2023-11-08T20:00",
        dhFim: "2023-11-09T18:00",
        nrCargaHoraria: 10,
        dsInformacoes: 'Informações do evento 2',
        nrUuidResponsavel: 1,
        idLocal: 1
    },
    {
        idEvento: 3,
        dsNome: 'Evento 3',
        dhInicio: "2023-11-08T20:00",
        dhFim: "2023-11-09T18:00",
        nrCargaHoraria: 10,
        dsInformacoes: 'Informações do evento 3',
        nrUuidResponsavel: 1,
        idLocal: 1
    },
    {
        idEvento: 4,
        dsNome: 'Evento 4',
        dhInicio: "2023-11-08T20:00",
        dhFim: "2023-11-09T18:00",
        nrCargaHoraria: 10,
        dsInformacoes: 'Informações do evento 4',
        nrUuidResponsavel: 1,
        idLocal: 1
    }
]

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
        /*syncData()*/
        const evento_ = db.filter(evento => evento.idEvento == idEvento)
        setEvento(evento_[0])
        setParticipantes([
            {
                idParticipante: 1,
                dsNome: 'Participante 1',
                dsEmail: 'participante@gmail.com',
                nrUuid: 1
            },
            {
                idParticipante: 2,
                dsNome: 'Participante 2',
                dsEmail: 'participante2@gmail.com',
                nrUuid: 2,
            }])
        console.log(evento)
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
        <div role="main">
            <h1>Evento</h1>
            <p>{evento.dsNome}</p>
            <p>{evento.dhInicio}</p>
            <p>{evento.dhFim}</p>
            <p>{evento.nrCargaHoraria}</p>
            <p>{evento.dsInformacoes}</p>
            <p>{evento.nrUuidResponsavel}</p>
            <p>{evento.idLocal}</p>
            <hr style={{ width: '100%' }} />
            <FormProvider {...methods}>
                <h2>Adicionar Participantes</h2>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <InputForm
                        params={EventMemberSchema.email}
                        type="email"
                        title="Email"
                        name="email"
                        placeholder="Digite o email"
                    />
                    <button type="button"
                        onClick={ ()=>{
                            const id = Math.random()*120;
                            setParticipantes([...participantes, {
                                idParticipante: id,
                                dsNome: 'Participante '+id,
                                dsEmail: 'newparticipant' + id + '@gmail.com',
                                nrUuid: id
                            }])
                        } }
                    >Adicionar</button>
                </form>
            </FormProvider>
            <div className={style.grid}>
                {
                    participantes.map(participante => {
                        return (
                            <ItemList
                                key={participante.idParticipante}
                                title={participante.dsNome}
                                subtitle={participante.dsEmail}
                                buttonTitle="Remover"
                                onClick={() => { removeMember(1) }}
                            />
                        )
                    })
                }
            </div>

        </div>
    )
}