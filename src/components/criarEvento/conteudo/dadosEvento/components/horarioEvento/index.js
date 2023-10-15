import styles from './horario.evento.module.css'

import Input from '@/components/input'

export default function HorarioEvento({dtStartEvent, dtEndEvent, item }) {

    return(
        <div className={styles.content}>
            <Input
            id='date'
            name='date'
            title='Dia'
            min={dtStartEvent}
            max={dtEndEvent}
            onChange={ ( event ) => item.date = event.target.value }
            type='date'/>
            <Input
            id='horarioDeInicio'
            name='horarioDeInicio'
            title='Horário de início'
            onChange={ ( event ) => item.startTime = event.target.value }
            type='time'/>
            <Input
            id='horarioDeEncerramento'
            name='horarioDeEncerramento'
            title='Horário de Encerramento'
            min={item.startTime} // TODO não esta funcionando 
            onChange={ ( event ) => item.endTime = event.target.value }
            type='time'/>
        </div>
    )
}