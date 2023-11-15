'use client'
import { useSearchParams } from "next/navigation";
import parse from 'html-react-parser'
import { useEffect, useRef, useState } from "react";
import generatePDF from "react-to-pdf";
import Button from "@/components/button";
import { fetchData } from "../api/utils/apiUtils";

export default function Certificado() {
    const searchParams = useSearchParams();
    const [html, setHtml] = useState('');
    const [jsx, setJsx] = useState([]);
    const hash = searchParams.get('hash'); //passado como query param na url
    if (!hash) return (<div>Não encontrado - verifique se já o emitiu em <a href="certificados">Meus Certificados</a></div>)
    const getHTML = async () => {
        const response = await fetchData(`http://localhost:8080/api/certificado/${hash}`)
        if (!response.ok) return (<div>Não encontrado - verifique se já o emitiu em <a href="certificados">Meus Certificados</a></div>)
        const html = await response.text();
        return html;
    }

    const targetRef = useRef();
    useEffect(() => {
        getHTML()
            .then(html => setHtml(html))
            .then(() => {
                setJsx(parse(html));
            })
        /*var html = gerarCertificado({
            eventObject: {
                name: 'Nome do Evento',
                dateStart: new Date('2023-11-14'),
                dateEnd: new Date('2023-11-15'),
                workload: 10,
                informations: 'Informações do evento',
            },
            certificateObject: {
                modelo: modelosCertificado.DEFAULT,
                personalData: {
                    instituicao: 'UTFPR',
                    logo: '../images/logoUtfpr.png',
                    local: 'Curitiba - PR',
                    backgroundImage: '../images/computer_peopple.png'
                }
            },
            organizador: 'Organizador do evento',
        })
        const data = emitirCertificado({
            nomeAluno: 'Nome Aluno',
            hash: hash,
            emitidoEm: new Date('2023-11-16'),
            html: html,
        })        */

    }, [])

    useEffect(() => {
        if (!jsx || jsx.length === 0) {
            console.log(jsx);
            return
        }
        const nomeAlunoElement = document.getElementById('nome-aluno');
        const emitidoEmElement = document.getElementById('emitido-em');
        const hashElement = document.getElementById('hash');

        nomeAlunoElement.innerHTML = 'Nome Aluno';
        emitidoEmElement.innerHTML = new Date('2023-11-16').toLocaleDateString();
        hashElement.setAttribute('href', 'http://localhost:3000/validar/' + hash);
        hashElement.innerHTML = 'http://localhost:3000/validar/' + hash;
    }, [jsx])

    return (
        <div id="certificadoDisplay" style={{ paddingTop: '4rem' }}>
            <Button onClick={() =>
                generatePDF(targetRef, {
                    filename: 'certificado.pdf',
                    method: 'save',
                    resolution: 5,
                    page: {
                        orientation: 'landscape',
                        format: 'letter'
                    }
                })
            }>Imprimir</Button>
            <div ref={targetRef}>
                {jsx}
            </div>
        </div>
    )
}
