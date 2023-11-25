'use client'
import { fetchData } from "@/app/api/utils/apiUtils"
import Button from "@/components/button"
import ItemList from "@/components/itemList"
import { useEffect, useState } from "react";

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

export default function GerenciarEventos() {
    const [eventos, setEventos] = useState([])
    const getData = async () => {
        const res = await fetchData('http://localhost:8080/api/evento/gerenciar');
        const data = await res.json();
        return data;
    }
    useEffect(() => {
        /*getData().then(data => {
            setEventos(data)
        })*/
        setEventos(db)
    }, [])
    
    return (
        <div className='main'> 
            <h1>GERENCIAR EVENTOS</h1>
            <div className='defaultGrid'>
            {eventos.map((evento, index) => {
                const subtitle_format = `${new Date(evento.dhInicio).toLocaleDateString()} - 
                        ${new Date(evento.dhFim).toLocaleDateString()}`
                return (
                    <ItemList
                        key={index}
                        title={evento.dsNome}
                        subtitle={subtitle_format}
                        buttonTitle="Gerenciar"
                        onClick={() => { location.href = `/evento/gerenciar/${evento.idEvento}` }}
                    />
                )
            })}
            </div>
            <div style={{ position: "fixed", bottom: "0px", right: "0px", margin: "20px" }}>
                <Button
                    onClick={() => { location.href = '/evento/novo' }}
                    isEnabled={true}
                >
                    Criar Evento
                </Button>
            </div>

        </div>
    )
}