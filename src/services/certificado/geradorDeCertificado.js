export default function gerarCertificado(props){
    const {eventObject, certificateObject, organizador, preview } = props;
    const emitidoEm = props.emitidoEm || new Date().toLocaleDateString();
    const { modelo } = certificateObject;
    if (modelo !== '1' && modelo !== '2') return ('<pre>Modelo de certificado não reconhecido</pre>')
    const { name, dateStart, dateEnd, workload } = eventObject;
    const { local } = certificateObject.personalData ?? 'Curitiba - PR';
    const dsFormat = new Date(dateStart).toLocaleDateString();
    const deFormat = new Date(dateEnd).toLocaleDateString();

    const hash = props.hash || 'codigoValidacao';
    const appName = props.appName || 'http://localhost:3000/';
    const nomeAluno = props.nomeAluno || 'Nome do Aluno';
    var dateText = '';
    
    if (dsFormat === deFormat) {
        dateText = 'no dia <span class="bold">' + dsFormat+'</span>';
    }
    else {
        dateText = 'entre os dias <span class="bold">' + dsFormat + '</span> e <span class="bold">' + deFormat + '</span>';
    }
    //////////////////////
        //corrigir para padronizar o tipo para string
    if (modelo == '1') {
        const { personalData } = certificateObject;
        const {instituicao, logo, local, backgroundImage} = personalData;
        const html = `
        <link rel="stylesheet" href="../stylesCertificado/modelo1.css">
        ${preview ? '<link rel="stylesheet" href="../stylesCertificado/preview.css">': ''}
        ${logo ? `<style>#logo{background-image: url(${logo})}</style>` : ''}
        ${backgroundImage ? `<style>.certificado{background-image: url(${backgroundImage})}</style>` : ''}
        <div class="certificado${backgroundImage ? ' custom-bg' : ''}" >
            <div id="header">
                <div id="logo" >
                </div>
                <div id="instituicao">
                    <p id="instituicao-nome">
                        ${instituicao}
                    </p>
                </div>
            </div>
            <div class="body">
                <h1 id="titulo">Certificado</h1>
                <div id="content">
                    <p id="descricao">
                        Certificamos que <span id="nome-aluno" class="bold">${nomeAluno}</span> participou do evento <span class="bold">${name}</span> realizado ${dateText} com carga horária de <span class="bold">${workload}</span> horas.
                    </p>
                    <p id="local" class="bold">
                        ${local}, ${emitidoEm}
                    </p>
                </div>
                <div id="assinatura">
                    <div id="assinatura-image">
                                      
                    </div>
                    <hr id="assinatura-linha">  
                    <p id="assinatura-nome">${organizador}</p>
                </div>
            </div>
            <div id="footer">
                <div id="validacao">
                    <div id="validacao-texto">
                        <p>Para verificar a autenticidade desse certificado, acesse: </p>
                    </div>
                    <div id="validacao-codigo">
                        <a href="#">${appName}validar/${hash}</a>
                    </div>
                </div>
            </div>
        </div>    
            `
            return html;
        
    }
    else if (modelo === '2') {
        const html =
        `
        <link rel="stylesheet" href="../stylesCertificado/modelo2.css">
        ${preview ? '<link rel="stylesheet" href="../stylesCertificado/preview.css">' : ''}
        <div class='certificado'>
            <div class="barrautfpr">
                <img src="../images/logoUtfpr.png" class="logo"/>
            </div>
            <div class="body modelo2">
                <img src="../images/gov.png" class="gov"/>
                    <h1>DECLARAÇÃO</h1>
                    <div class="content">
                        <p>
                            Declaramos para os devidos fins que <span id="nome-aluno">${nomeAluno}</span>,
                            atuou como participante no evento ${name},
                            com ${workload} horas de atividades realizadas ${dateText}
                        </p>
                        <p class='local'>
                            ${local}, ${emitidoEm}
                        </p>
                    </div>
            </div>
            <div class="footer">
            <p id="validacao-texto">
                A autenticidade deste documento pode ser verificada através da URL:
                <a href="${appName}validar/${hash}">
                    ${appName}validar/${hash}
                </a>
                </p>
            </div>
        </div>`;
        return html;      
    }   
}