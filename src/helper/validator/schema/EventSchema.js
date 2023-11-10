import MessageHelper from "@/helper/validator/message/MessageHelper";
import InputHelper from "@/helper/validator/input/InputHelper"
import DateValidator from "@/helper/validator/date/DateValidator";
import RegexValidator from "../regex/RegexValidator";

const EventSchema = {
    name : {
        required: MessageHelper.required,
        maxLength: { 
            value: InputHelper.length.name.max,
            message: MessageHelper.lengthMax.replace( "%1", InputHelper.length.name.max )
        }
    },
    dateStart: {
        required: MessageHelper.required
    },
    dateEnd: {
        validate: ( value, formValues ) => DateValidator.validateDateTimeMin( value, formValues.dateStart ) 
    },
    workload : {
        required: MessageHelper.required,
        pattern: {
            value: RegexValidator.type.number.interval.oneToNinetyNine.pattern,
            message: MessageHelper.lengthInterval.replace( "%1", RegexValidator.type.number.interval.oneToNinetyNine.min ).
            replace( "%2", RegexValidator.type.number.interval.oneToNinetyNine.max )
        }
    },
    informations : {
        required: MessageHelper.required,
    },
}

export default EventSchema;