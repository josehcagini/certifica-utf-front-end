const CertificateSchema = {
    modelo: {
        type: "string",
        required: true,
    },
    instituicao: {
        type: "string",
        required: false,
    },
    logo:{
        type: "file",
        required: false,
    },
    local: {
        type: "string",
        required: false,
    },
    backgroundImage: {
        type: "file",
        required: false,
    }
}

export default CertificateSchema;