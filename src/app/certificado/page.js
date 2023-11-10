import gerarCertificado from "@/services/certificado/geradorDeCertificado";
import { useSearchParams } from "next/navigation";
import parse from 'html-react-parser'

export const modelosCertificado = {
    DEFAULT: 1,
    UTFPR: 2,
    PERSONAL: 3
}

export default async function Certificado(){
    const searchParams = useSearchParams();
    const hash = searchParams.get('hash'); //passado como query param na url
    const response = await fetch(`${API_BASE_URL}/api/certificado/${hash}`);
    const html = await response.text();
    //const eventObject = await response.json();

    //const { name, dateStart, dateEnd, workload, informations, organizador, personalData, tipoCertificado } = eventObject;
    /*const { local, instituicao, document, logo } = personalData;
    console.log(personalData)
    html = gerarCertificado({
        modelo: tipoCertificado,
        name: name,
        dateStart: new Date(dateStart).toLocaleDateString(),
        dateEnd: new Date(dateEnd).toLocaleDateString(),
        workload: workload,
        informations:  informations,
        organizador: organizador,
        instituicao: instituicao,
        logo: logo,
        local: local || 'UTFPR'
    }) /*/

    return parse(html);
}
