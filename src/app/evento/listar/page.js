'use client'
import ItemList from "@/components/itemList";
import Modal from "@/components/modal/index";
import { useEffect, useState } from "react";
import { fetchData, buildInit } from "@/app/api/utils/apiUtils";
import { useSearchParams } from "next/navigation";
import { useSession } from 'next-auth/react';

export default function ListarEventos() {
    const [eventos, setEventos] = useState([]);
    const [eventoModal, setEventoModal] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const eventId = useSearchParams().get('eventId');
    const inscricao = useSearchParams().get('inscricao');
    const session = useSession();

    const getEventos = async () => {

        // TODO rever isso, esta sendo usando apenas porque o session esta com problema
        if( session.status == 'loading' ){
            return;
        }

        const response = await fetchData(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/evento/findAll`, buildInit( session ))
        const data = await response.json()
        if (response.status === 200) {
            setEventos(data);
        } else {
            console.log('Erro ao buscar eventos')
        }
    };

    useEffect(() => {
        getEventos();
    }, [session.status]);

    useEffect(() => {
        //Exibir modal de inscrição caso o evento seja passado por parâmetro
        //Ação esperada quando o usuário acessa pelo link/qrcode gerado pelo organizador
        //TODO: verificar se o usuário já está inscrito no evento, 
        //pode ser verificada no Modal (HU 0.1), caso o usuário já esteja inscrito, exibir botão de cancelar inscrição 
        if (eventId && eventos.length > 0 && inscricao==='true') {
            showModal(eventos.find(evento => evento.idEvent == eventId))
        }
    }, [eventId, eventos.length]);

    const showModal = (evento) => {
        setEventoModal(evento);
        setIsModalVisible(true);
    }

    const hideModal = () => {
        setEventoModal({});
        setIsModalVisible(false);
    }

    const realizarInscricao = async () => {
        //TODO: enviar requisição para realizar inscrição
        hideModal();
    }

    return (
        <div className="main">
            <h1>Eventos Disponíveis</h1>
            <div className="defaultGrid">
                {
                    eventos.length > 0 ?
                        eventos.map((evento) => {
                            return (
                                <ItemList
                                    id={evento.idEvent}
                                    key={evento.idEvent}
                                    title={evento.name}
                                    subtitle={evento.informations}
                                    buttonTitle="Inscrever-se"
                                    onClick={() => showModal(evento)}
                                />
                            )
                        }) :
                        <h2>Nenhum evento próximo disponível</h2>
                }
            </div>
            {
                isModalVisible &&
                <Modal
                    title={eventoModal.name}
                    dismiss={hideModal}
                    buttonTitle="Realizar Inscrição"
                    onClick={realizarInscricao}
                >
                    {
                        //Exibir as informações do evento
                        /*
                        HU 0.1
                        */
                    }
                </Modal>
            }
        </div>
    )
}