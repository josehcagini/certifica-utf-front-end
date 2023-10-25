import Input from "@/components/input";
import { useSession } from "next-auth/react";

export default function Finalizar({ setIsValidData, eventObject }) {
    //Obter os dados das steps anteriores
    const nomeEvento = "Nome do evento"; 
    const descricao = "Descrição do evento";
    ////
    
    const session = useSession();
    const organizador = session?.data?.user?.name;

    return (
        <div>
            <h2>Conferir dados do evento</h2>
            <p>Nome do Evento: {nomeEvento}</p>
            <p>Descrição: {descricao}</p>
            <p>Organizador: {organizador}</p>


        </div>
    )
}