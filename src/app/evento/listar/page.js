'use client'
import ItemList from "@/components/itemList";
import Modal from "@/components/modal/index";
import { useEffect, useState } from "react";
import { fetchData } from "@/app/api/utils/apiUtils";
import { useSearchParams } from "next/navigation";

export default function ListarEventos() {
    const [eventos, setEventos] = useState([]);
    const [eventoModal, setEventoModal] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const eventId = useSearchParams().get('eventId');
    const inscricao = useSearchParams().get('inscricao');

    const getEventos = async () => {
        const response = await fetchData(`${process.env.NEXT_PUBLIC_API_BASE_URL}/eventos`)
        const data = await response.json()
        if (response.status === 200) {
            setEventos(data);
        } else {
            console.log('Erro ao buscar eventos')
        }
    };

    useEffect(() => {
        //getEventos();
        /**/
        setEventos([
            {
                nome: 'Evento 1',
                descricao: 'Descrição 1',
                dsDateStart: '01/01/2021',
                dsTimeStart: '10:00',
                dsDateEnd: '01/01/2021',
                dsTimeEnd: '12:00',
                local: 'Auditório Principal',
                organizador: 'Organizador 1',
                id:1
            },
            {
                nome: 'Evento 2',
                descricao: 'Descrição do evento',
                dsDateStart: '11/12/2023',
                dsTimeStart: '14:00',
                dsDateEnd: '15/12/2023',
                dsTimeEnd: '18:00',
                local: 'Auditório Principal',
                organizador: 'Organizador 1',
                id:3
            }

        ])
        /**/
    }, []);

    useEffect(() => {
        //Exibir modal de inscrição caso o evento seja passado por parâmetro
        //Ação esperada quando o usuário acessa pelo link/qrcode gerado pelo organizador
        //TODO: verificar se o usuário já está inscrito no evento, 
        //pode ser verificada no Modal (HU 0.1), caso o usuário já esteja inscrito, exibir botão de cancelar inscrição 
        if (eventId && eventos.length > 0 && inscricao==='true') {
            showModal(eventos.find(evento => evento.id == eventId))
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
                                    id={evento.id}
                                    key={evento.id}
                                    title={evento.nome}
                                    subtitle={evento.descricao}
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
                    title={eventoModal.nome}
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