'use client'
import ItemList from "@/components/itemList";
import Modal from "@/components/modal";
import { useEffect, useState } from "react";

export default function ListarEventos() {
    const [eventos, setEventos] = useState([]);
    const [eventoModal, setEventoModal] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);

    const getEventos = async () => {
        const response = await fetchData(`${process.env.API_BASE_URL}/eventos`)
        const data = await response.json()
        if (response.status === 200) {
            setEventos(data);
        } else {
            console.log('Erro ao buscar eventos')
        }
    };

    useEffect(() => {
        getEventos()
    },[]);

    return (
        <div>
            <h1>Eventos Disponíveis</h1>
            {
                eventos.length > 0 ?
                eventos.map((evento) => {
                    return (
                        <ItemList
                            title={evento.nome}
                            subtitle={evento.descricao}
                            buttonTitle="Inscrever-se"
                            onClick={() => {showModal(evento)}} />
                    )
                }) :
                <h2>Nenhum evento próximo disponível</h2>
            }
            {
                isModalVisible &&
                <Modal
                    title={eventoModal.nome}
                    dismiss={() => {setIsModalVisible(false)}}
                >
                    <p><b>Datas do Evento:</b>{eventoModal.dsDateStart}</p>
                    <p><b>Início: </b></p>


                </Modal>
            }
        </div>
    )
}