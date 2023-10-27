import styles from './horario.evento.module.css'

import Input from '@/components/input'

import DateValidator from '@/helper/validator/date/DateValidator'
import MessageHelper from '@/helper/validator/message/MessageHelper'
import DateHelper from '@/helper/date/DateHelper'

export default function HorarioEvento( { item, index, arrayName }) {

    const EventTimeSchema = {
        date: {
            validate: ( value, formValues ) => {

                if( index === 0 ){
                    return DateValidator.validateDateInterval( formValues.dateStart, value, formValues.dateEnd )
                }

                return DateValidator.validateDateInterval( formValues.dates[index-1].date, value, formValues.dateEnd )
            }
        },
        startTime: {
            validate: ( value, formValues ) => {

                if( index === 0 && DateHelper.isEqualsDateFromString( formValues.dates[index].date, formValues.dateStart ) ) {
                    return DateValidator.validateHourMin( value, DateHelper.timeFromDateTimeAsString( new Date( formValues.dateStart ) ) );
                }

                if( index !== 0 && DateHelper.isEqualsDateFromString( formValues.dates[index].date, formValues.dates[index-1].date ) ){
                    return DateValidator.validateHourMin( value, formValues.dates[index-1].endTime );
                }

                return DateValidator.validateHourMax( value, formValues.dates[index].endTime );

            }
        },
        endTime: {
            validate: ( value, formValues ) => {

                if( !value ){
                    return MessageHelper.required
                }

                if( DateHelper.isEqualsDateFromString( formValues.dates[index].date, formValues.dateEnd ) ){
                    return DateValidator.validateHourMax( value, DateHelper.timeFromDateTimeAsString( new Date( formValues.dateEnd ) ) );
                }

                return true
            }
        }
    }

    return(
        <div className={styles.content}>
            <Input
            params={EventTimeSchema.date}
            id='date'
            name={`${arrayName}.${index}.date`}
            title='Dia'
            type='date'/>
            <Input
            params={EventTimeSchema.startTime}
            id='horarioDeInicio'
            name={`${arrayName}.${index}.startTime`}
            title='Horário de início'
            type='time'/>
            <Input
            params={EventTimeSchema.endTime}
            id='horarioDeEncerramento'
            name={`${arrayName}.${index}.endTime`}
            title='Horário de Encerramento'
            type='time'/>
        </div>
    )
}