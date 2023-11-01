//Objeto que será salvo no banco, para ser usado como template para 
//gerar o certificado, junto do eventObject

import { modelosCertificado } from "@/app/certificado/page"
const CertificateObject = {
    modelo: modelosCertificado.DEFAULT,
    personalData: {
        instituicao: null,
        local: null,
        backgroundImage: null,
        logo: null
    }
}

export default CertificateObject;