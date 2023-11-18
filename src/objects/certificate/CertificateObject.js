//Objeto que será salvo no banco, para ser usado como template para 
//gerar o certificado, junto do eventObject

const certificateModel = {
    DEFAULT: '1',
    UTFPR: '2',
    CUSTOM: '3' //ainda não utilizado, mas manter para o futuro
}

const CertificateObject = {
    modelo: certificateModel.DEFAULT,
    personalData: {
        instituicao: null,
        local: null,
        backgroundImage: null,
        logo: null
    }
}

export { CertificateObject, certificateModel };