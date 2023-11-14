'use client'
import gerarCertificado from "@/services/certificado/geradorDeCertificado";
import { useSearchParams } from "next/navigation";
import parse from 'html-react-parser'
import { useEffect, useRef, useState } from "react";
import generatePDF from "react-to-pdf";
import Button from "@/components/button";

export const modelosCertificado = {
    DEFAULT: '1',
    UTFPR: '2',
    PERSONAL: '3'
}

export default function Certificado() {
    const searchParams = useSearchParams();
    const [html, setHtml] = useState('');
    const hash = searchParams.get('hash'); //passado como query param na url
    /*const getHTML = async () => {
        const response = await fetch(`${API_BASE_URL}/api/certificado/${hash}`)
        const html = await response.text();
        return html;
    }*/
    useEffect(() => {
        /*getHTML().then(html => setHtml(html));*/
        const html = gerarCertificado({
            eventObject: {
                name: 'Nome do Evento',
                dateStart: new Date().toLocaleDateString(),
                dateEnd: new Date().toLocaleDateString(),
                workload: 10,
                informations: 'Informações do evento',
            },
            certificateObject: {
                modelo: modelosCertificado.DEFAULT,
                personalData: {
                    instituicao: 'UTFPR',
                    logo: 'https://www.utfpr.edu.br/curitiba/estrutura-universitaria/diretorias/dirppg/imagens/logo-utfpr.png',
                    local: 'Curitiba - PR',
                    backgroundImage: 'https://www.utfpr.edu.br/curitiba/estrutura-universitaria/diretorias/dirppg/imagens/logo-utfpr.png'
                }
            },
            organizador: 'Organizador do evento'
        })
        setHtml(html);
    }, [])
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

    const targetRef  = useRef();

    return (
        <div id="certificadoDisplay" style={{ paddingTop: '4rem' }}>
            <button onClick={() =>
                generatePDF(targetRef,{
                    filename:'certificado.pdf',
                    page:{
                        orientation: 'landscape',
                        size: 'A4'
                    }
                })
            }>Imprimir</button>
            <div ref={targetRef}>
                {parse(html)}
            </div>
        </div>
    )
}
