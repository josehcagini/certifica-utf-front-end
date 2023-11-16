'use client';

import styles from './page.module.css'
import { signOut, useSession } from 'next-auth/react';
import { BiPlus, BiLocationPlus } from 'react-icons/bi' ;
import { PiNotebookDuotone } from 'react-icons/pi' ;
import { AiOutlineImport } from 'react-icons/ai' ;
import { LuCalendarSearch, LuCalendarPlus, LuCalendar } from 'react-icons/lu' ;
import { FaWpforms } from 'react-icons/fa'
import Card from '@/components/card';
import { isAdmin } from '@/services/user/userService';


export default function Home() {

  const session = useSession();

  // TODO chamar backend para cadastrar o usuario, analisar melhor como vai funcionar o esquema de autenticação
  console.log(session.data);
  return (
    <div className={styles.content}>
      { !isAdmin( session?.data?.user?.roles ?? [] ) ? 
        <>
          <div className={styles.containerTitle}>
            <h1>Certificados</h1>
          </div>
          <div className={styles.container}>
            <Card title="Emitir Certificado" icon={<BiPlus size={35}/>} link="/evento/criar"/>
            <Card title="Visualizar Certificado" icon={<PiNotebookDuotone size={35}/>} link=""/>
            <Card title="Importar Certificado" icon={<AiOutlineImport size={35}/>} link=""/>
          </div>
        </> : <></>
      }
      <div className={styles.containerTitle}>
        <h1>Eventos</h1>
      </div>
      { !isAdmin( session?.data?.user?.roles ?? [] ) ? 
        <div className={styles.container}>
          <Card title="Eventos Disponíveis" icon={<LuCalendarSearch size={35}/>} link="/evento/criar"/>
          <Card title="Inscrições" icon={<FaWpforms size={35}/>} link=""/>
          <Card title="Fazer Check-in" icon={<BiLocationPlus size={35}/>} link=""/>
        </div> 
        : 
        <div className={styles.container}>
          <Card title="Ver Eventos" icon={<LuCalendarSearch size={35}/>} link="/evento/criar"/>
          <Card title="Gerenciar Eventos" icon={<LuCalendar size={35}/>} link=""/>
          <Card title="Criar Eventos" icon={<LuCalendarPlus size={35}/>} link=""/>
        </div>
      } 
    </div>
    
  )
}
