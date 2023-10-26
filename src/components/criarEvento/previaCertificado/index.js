import parse from 'html-react-parser'
import gerarCertificado from '@/services/certificado/geradorDeCertificado';

//Exibir uma imagem gerada dinamicamente para evitar 
//alterar os estilos do certificado para caber na tela
export default function PreviaCertificado({ data }) {
  // Salvar o nome do organizador no eventObject 
  //passar por props por enquanto
  const {tipoCertificado, name, dateStart, dateEnd, workload, organizador, personalData, local } = data;
  const { document } = personalData;
  const html = gerarCertificado({
    modelo: tipoCertificado,
    name: name,
    dateStart: new Date(dateStart).toLocaleDateString(),
    dateEnd: new Date(dateEnd).toLocaleDateString(),
    workload: workload,
    organizador: organizador,
    local: local || 'Dois Vizinhos - PR',
    personalData: personalData,
    preview: true
  })
  return tipoCertificado === '3' ? parse(document) : parse(html);
}