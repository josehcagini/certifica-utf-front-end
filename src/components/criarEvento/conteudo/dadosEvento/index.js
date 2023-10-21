import styles from './dados.module.css'

import Input from '@/components/input'
import TextArea from '@/components/textarea';
import Button, { ButtonType } from '@/components/button';

import EventTime from '@/objects/event/eventTime';

import { BiPlus } from 'react-icons/bi' ;   
import { useState } from 'react'

import HorarioEvento from './components/horarioEvento';

export default function DadosEvento( { setIsValidData, eventObject } ){

    const dtMinInput = "2023-01-07T00:00";
    const dtMaxInput = "2025-01-07T00:00";

    const [ eventsTime, setEventsTime ] = useState( [] );

    eventObject.dates = eventsTime;

    setIsValidData( true ) // TODO Alterar para validar se os inputs são validos 

    function addDateEvent(){

        // TODO por enquanto vou deixar limitado a 3, isso para não ter que tratar o scroll 
        if( eventsTime.length === 3 ){
            return;
        }

        const events = [...eventsTime]
        events.push( Object.assign( {}, EventTime ) );
        setEventsTime( events );
    }

    return(
        <div>
            <div className={styles.inputGroup}>
                <div className={styles.inputLeftGroup}>
                    <Input
                    width='100%'
                    id='nomeDoEvento'
                    name='nomeDoEvento'
                    title='Nome'
                    placeholder='Nome do Evento'
                    onChange={ ( event ) => eventObject.name = event.target.value }
                    type='text'/>
                    <div className={styles.contentDate}>
                        <Input
                        id='dataDeInicio'
                        name='dataDeInicio'
                        title='Data de inicio'
                        min={dtMinInput}
                        max={dtMaxInput}
                        onChange={ ( event ) => eventObject.dateStart = event.target.value }
                        type='datetime-local'/>
                        <Input
                        id='dataDeEncerramento'
                        name='dataDeEncerramento'
                        title='Data de Encerramento'
                        min={dtMinInput}
                        max={dtMaxInput}
                        onChange={ ( event ) => eventObject.dateEnd = event.target.value }
                        type='datetime-local'/>
                    </div>
                    <div className={styles.eventTimes}>
                        <label>Horários do evento</label>
                        { eventsTime.map( ( item, index ) => <HorarioEvento key={index} item={item} dtStartEvent={dtMinInput} dtEndEvent={dtMaxInput}/> ) }
                        <Button onClick={addDateEvent} type={ ButtonType.OUTLINE } icon={<BiPlus size={20}/> } >Adicionar horario</Button>
                    </div>
                    <Input
                    width='20%'
                    id='cargaHoraria'
                    name='cargaHoraria'
                    title='Carga Horária'
                    onChange={ ( event ) => eventObject.workload = event.target.value }
                    placeholder='hh'
                    type='text'/>
                </div>
                <div className={styles.inputGroupRight}>
                    <TextArea 
                    placeholder='Informações do evento'
                    title='Informações'
                    onChange={ ( event ) => eventObject.informations = event.target.value }
                    />
                </div>
            </div>
        </div>
    )
}