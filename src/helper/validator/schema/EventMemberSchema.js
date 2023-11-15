import MessageHelper from "../message/MessageHelper";
import InputHelper from "../input/InputHelper";

const EventMemberSchema = {
    email: {
        required: MessageHelper.required,
        maxLength: { 
            value: InputHelper.length.name.max,
            message: MessageHelper.lengthMax.replace( "%1", InputHelper.length.name.max )
        }
    }
}

export default EventMemberSchema;