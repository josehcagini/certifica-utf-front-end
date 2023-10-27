import MessageHelper from "@/helper/validator/message/MessageHelper";
import DateValidator from "@/helper/validator/date/DateValidator";

const EventTimeSchema = {
    date: {
        validate: ( value, formValues ) => {
            return DateValidator.validateDateInterval( formValues.dateStart, value, formValues.dateEnd )
        }
    },
    startTime: {
        required: MessageHelper.required
    },
}

export default EventTimeSchema;