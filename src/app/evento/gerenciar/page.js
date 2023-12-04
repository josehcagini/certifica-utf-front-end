'use client'
import { fetchData, buildInit } from "@/app/api/utils/apiUtils"
import Button from "@/components/button"
import ItemList from "@/components/itemList"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { LoadingListSkeleton } from "@/components/loading/loading";
import { isAdmin } from "@/services/user/userService";
import { getUserRole } from "@/services/session/sessionService";

export default function GerenciarEventos() {

    const session = useSession();

    const [eventos, setEventos] = useState([])
    const getData = async () => {
        const res = await fetchData(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/evento/findAll/${session?.data?.user?.nrUuid}`, buildInit(session)
        );
        const data = await res.json();
        return data;
    }
    useEffect(() => {
        getData().then(data => {
            setEventos(data)
        })
    }, [session.status])


    return (
        <div className='main'>
            {session.status === 'loading' && <LoadingListSkeleton />}
            {isAdmin(getUserRole(session)) && session.data ?
                <>
                    <h1>GERENCIAR EVENTOS</h1>
                    <div className='defaultGrid'>
                        {eventos.map((evento, index) => {
                            const subtitle_format = `${new Date(evento.dateStart).toLocaleDateString()} - 
                        ${new Date(evento.dateEnd).toLocaleDateString()}`
                            return (
                                <ItemList
                                    key={index}
                                    title={evento.name}
                                    subtitle={subtitle_format}
                                    buttonTitle="Gerenciar"
                                    onClick={() => { location.href = `/evento/gerenciar/${evento.idEvent}` }}
                                />
                            )
                        })}
                    </div>
                    <div style={{ position: "fixed", bottom: "0px", right: "0px", margin: "20px" }}>
                        <Button
                            onClick={() => { location.href = '/evento/criar' }}
                            isEnabled={true}
                        >
                            Criar Evento
                        </Button>
                    </div>
                </>
                :
                <h1 style={{ marginTop: '4rem', textAlign: 'center' }}>Você não tem permissão para acessar essa página</h1>
            }
        </div>

    )
}