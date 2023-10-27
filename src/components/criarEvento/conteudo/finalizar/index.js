import Input from "@/components/input";
import { useSession } from "next-auth/react";
import { useFormContext } from "react-hook-form"

export default function Finalizar() {

    const session = useSession();
    const organizador = session?.data?.user?.name;

    const { getValues } = useFormContext()

    return (
        <div>
            <h2>Conferir dados do evento</h2>
            <p>Nome do Evento: {getValues('name')}</p>
            <p>Descrição: {getValues('informations')}</p>
            <p>Organizador: {organizador}</p>
        </div>
    )
}