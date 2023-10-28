import styles from './dados.module.css'

import InputForm from '@/components/inputForm';
import TextAreaForm from '@/components/textAreaForm';
import Button, { ButtonType } from '@/components/button';

import { BiPlus } from 'react-icons/bi' ;   
import { useFormContext, useFieldArray } from "react-hook-form"

import EventTimeObject from '@/objects/event/EventTimeObject';
import HorarioEvento from './components/horarioEvento';
import EventSchema from '@/helper/validator/schema/EventSchema';

export default function DadosEvento(){

    const { control } = useFormContext()

    // TODO adicionar botão para remover data 
    const { fields, append, remove } = useFieldArray( {
        control,
        name: "dates",
    });

    const nrLimitDatesEvent = 3;

    function addDateEvent(){

        // TODO por enquanto vou deixar limitado a 3, isso para não ter que tratar o scroll 
        if( fields.length === nrLimitDatesEvent ){
            return;
        }

        append( Object.assign( {}, EventTimeObject ) )
    }
    
    return(
        <div>
            <div className={styles.inputGroup}>
                <div className={styles.inputLeftGroup}>
                    <InputForm
                    params={EventSchema.name}
                    width='100%'
                    name='name'
                    title='Nome'
                    placeholder='Nome do Evento'
                    type='text'/>
                    <div className={styles.contentDate}>
                        <InputForm
                        params={EventSchema.dateStart}
                        name='dateStart'
                        title='Data de inicio'
                        type='datetime-local'/>
                        <InputForm
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
                        isEnabled={fields.length < nrLimitDatesEvent}
                        icon={<BiPlus size={20} isEnable/> }>
                        Adicionar horario
                        </Button>
                    </div>
                    <InputForm
                    params={EventSchema.workload}
                    width='20%'
                    name='workload'
                    title='Carga Horária'
                    placeholder='hh'
                    type='text'/>
                </div>
                <div className={styles.inputGroupRight}>
                    <TextAreaForm
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