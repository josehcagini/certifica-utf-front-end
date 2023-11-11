export default function emitirCertificado(data) {
    const {nomeAluno, hash, html } = data;
    const emitidoEm = data.emitidoEm || new Date().toLocaleDateString();
    const appName = data.appName || 'http://localhost:3000/';
    const href = appName + 'validar/' + hash;
    const certificado = `
    <DOCTYPE html>
    <html lang="pt-br">
        <head>
            <meta charset="utf-8">
            <title>${props.hash}</title>
        </head>
        <script>
            function format(){
                const nomeAluno = ${nomeAluno};
                const emitidoEm = ${emitidoEm};
                const hash = ${hash};

                const nomeAlunoElement = document.getElementById('nome-aluno');
                const emitidoEmElement = document.getElementById('emitido-em');
                const hashElement = document.getElementById('hash');

                nomeAlunoElement.innerHTML = nomeAluno;
                emitidoEmElement.innerHTML = emitidoEm;
                hashElement.attributes.href = ${href};
                hashElement.innerHTML = ${href};
            }
            window.onload = format;
        </script>
        <body id="no-header">
            ${html}
        </body>
    </html>
    `
    return certificado;
}