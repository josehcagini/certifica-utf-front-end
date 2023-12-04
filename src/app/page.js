'use client';
import styles from './page.module.css'
import { useSession } from 'next-auth/react';
import { BiPlus, BiLocationPlus } from 'react-icons/bi';
import { PiNotebookDuotone } from 'react-icons/pi';
import { AiOutlineImport } from 'react-icons/ai';
import { LuCalendarSearch, LuCalendarPlus, LuCalendar } from 'react-icons/lu';
import { FaWpforms } from 'react-icons/fa'
import Card from '@/components/card';
import { isAdmin } from '@/services/user/userService';
import { useEffect, useState } from 'react';
import { getUserRole } from '@/services/session/sessionService';
import Loading from '../components/loading/loading';

export default function Home() {
  const session = useSession();
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const adminUser = isAdmin(getUserRole(session));
    console.log(session)
    setIsAdminUser(adminUser);
    setIsLoading(false);
  }, [session && session?.status !== 'loading'])

  return (
    <div className={styles.content}>
      {isLoading ? <Loading /> :
        <>
          {!isAdminUser ?
            <>
              <div className={styles.containerTitle}>
                <h1>Certificados</h1>
              </div>
              <div className={styles.container}>
                <Card title="Emitir Certificado" icon={<BiPlus size={35} />} link="/certificado/emitir" />
                <Card title="Visualizar Certificado" icon={<PiNotebookDuotone size={35} />} link="/certificado/listar" />
                <Card title="Importar Certificado" icon={<AiOutlineImport size={35} />} link="/certificados" />
              </div>
            </> : <></>
          }
          <div className={styles.containerTitle}>
            <h1>Eventos</h1>
          </div>
          {!isAdminUser ?
            <div className={styles.container}>
              <Card title="Eventos Disponíveis" icon={<LuCalendarSearch size={35} />} link="/evento/listar" />
              <Card title="Inscrições" icon={<FaWpforms size={35} />} link="/evento/inscritos" />
              <Card title="Fazer Check-in" icon={<BiLocationPlus size={35} />} link="/checkin" />
            </div>
            :
            <div className={styles.container}>
              <Card title="Ver Eventos" icon={<LuCalendarSearch size={35} />} link="/evento/listar" />
              <Card title="Gerenciar Eventos" icon={<LuCalendar size={35} />} link="/evento/gerenciar" />
              <Card title="Criar Eventos" icon={<LuCalendarPlus size={35} />} link="/evento/criar" />
            </div>
          }
        </>}
    </div>

  )
}
