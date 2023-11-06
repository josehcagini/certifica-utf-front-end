import MessageHelper from "../message/MessageHelper";
import InputHelper from "../input/InputHelper";

const CertificateSchema = {
    modelo: {
        required: MessageHelper.required,
    },
    instituicao: {
        maxLength: { 
            value: InputHelper.length.name.max,
            message: MessageHelper.lengthMax.replace( "%1", InputHelper.length.name.max )
        }
    }
}

export default CertificateSchema;