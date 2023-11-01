import parse from 'html-react-parser'
import gerarCertificado from '@/services/certificado/geradorDeCertificado';

//Exibir uma imagem gerada dinamicamente para evitar 
//alterar os estilos do certificado para caber na tela
export default function PreviaCertificado({ data }) {
  // Salvar o nome do organizador no eventObject 
  //passar por props por enquanto
  const {eventObject, certificateObject, organizador} = data;
  const { tipoCertificado, personalData } = certificateObject;
  if (tipoCertificado === '3'){
    return parse('<div>Modelo não reconhecido</div>')
  }
  const { name, dateStart, dateEnd, workload, local } = eventObject;
  const html = gerarCertificado({
    modelo: tipoCertificado || '1',
    name: name,
    dateStart: new Date(dateStart).toLocaleDateString(),
    dateEnd: new Date(dateEnd).toLocaleDateString(),
    workload: workload,
    organizador: organizador,
    local: local || 'Dois Vizinhos - PR',
    personalData: personalData,
    preview: true
  })
  return parse(html);
}