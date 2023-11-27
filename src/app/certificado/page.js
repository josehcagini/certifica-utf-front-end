'use client'
import { useSearchParams } from "next/navigation";
import parse from 'html-react-parser'
import { useEffect, useRef, useState } from "react";
import generatePDF from "react-to-pdf";
import Button from "@/components/button";
import { fetchData } from "../api/utils/apiUtils";
import gerarCertificado from "@/services/certificado/geradorDeCertificado";
import { certificateModel } from "@/objects/certificate/CertificateObject";

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
        /*getHTML()
            .then(html => setHtml(html))
            .then(() => {
                setJsx(parse(html));
            })*/

        var html = gerarCertificado({
            eventObject: {
                name: 'Nome do Evento',
                dateStart: new Date('2023-11-14'),
                dateEnd: new Date('2023-11-15'),
                workload: 10,
                informations: 'Informações do evento',
            },
            certificateObject: {
                modelo: certificateModel.DEFAULT,
                personalData: {
                    instituicao: 'Universidade Tecnológica Federal do Paraná',
                    logo: '../images/logoUtfpr.png',
                    local: 'Curitiba - PR',
                    backgroundImage: '../images/google.png'
                }
            },
            organizador: 'Organizador do evento',
        })
        setHtml(html);
        setJsx(parse(html));

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

    const handlePrint = async () => {
        alert('Para garantir que o certificado seja impresso corretamente, verifique se a posição da impressão está em paisagem, e a margem é zero ou nenhum.\n As configurações podem ser alteradas em "Mais configurações" > "Margens" > "Nenhum"')
        window.print();
    }

    const style = {
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
    }

    return (
        <div id="certificadoDisplay">
            <aside className="no-print" style={style}>
            <Button isEnabled={true}
                onClick={() =>
                    generatePDF(targetRef, {
                        filename: 'certificado.pdf',
                        method: 'open',
                        resolution: 5,
                        page: {
                            orientation: 'landscape',
                        }
                    })
                }>Visualizar</Button>
            <Button
                isEnabled={true}
                onClick={handlePrint}
            >Imprimir</Button>
            </aside>
            <div ref={targetRef}>
                {jsx}
            </div>
        </div>
    )
}
