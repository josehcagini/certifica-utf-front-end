import styles from './dados.module.css'

import Input from '@/components/input'
import TextArea from '@/components/textarea';
import Button, { ButtonType } from '@/components/button';

import { BiPlus } from 'react-icons/bi' ;   
import { useFormContext, useFieldArray } from "react-hook-form"

import EventTime from '@/objects/event/eventTime';
import HorarioEvento from './components/horarioEvento';
import EventSchema from '@/helper/validator/schema/EventSchema';

export default function DadosEvento(){

    const { control } = useFormContext()

    const { fields, append, remove } = useFieldArray( {
        control,
        name: "dates",
    });

    function addDateEvent(){

        // TODO por enquanto vou deixar limitado a 3, isso para não ter que tratar o scroll 
        if( fields.length === 3 ){
            return;
        }

        append( Object.assign( {}, EventTime ) )
    }
    
    return(
        <div>
            <div className={styles.inputGroup}>
                <div className={styles.inputLeftGroup}>
                    <Input
                    params={EventSchema.name}
                    width='100%'
                    name='name'
                    title='Nome'
                    placeholder='Nome do Evento'
                    type='text'/>
                    <div className={styles.contentDate}>
                        <Input
                        params={EventSchema.dateStart}
                        name='dateStart'
                        title='Data de inicio'
                        type='datetime-local'/>
                        <Input
                        params={EventSchema.dateEnd}
                        name='dateEnd'
                        title='Data de Encerramento'
                        type='datetime-local'/>
                    </div>
                    <div className={styles.eventTimes}>
                        <label>Horários do evento</label>
                        { fields.map( ( item, index ) => 
                            <HorarioEvento 
                            arrayName="dates"
                            key={index}
                            index={index}
                            item={item}/> 
                        ) }
                        <Button 
                        onClick={addDateEvent}
                        type="button"
                        styleType={ButtonType.OUTLINE}
                        icon={<BiPlus size={20} isEnable/> }>
                        Adicionar horario
                        </Button>
                    </div>
                    <Input
                    params={EventSchema.workload}
                    width='20%'
                    name='workload'
                    title='Carga Horária'
                    placeholder='hh'
                    type='text'/>
                </div>
                <div className={styles.inputGroupRight}>
                    <TextArea
                    params={EventSchema.informations}
                    name="informations"
                    placeholder='Informações do evento'
                    title='Informações'
                    />
                </div>
            </div>
        </div>
    )
}