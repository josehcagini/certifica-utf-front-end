import parse from 'html-react-parser'
import gerarCertificado from '@/services/certificado/geradorDeCertificado';

export default function PreviaCertificado({ data }) {
  const {eventObject, certificateObject, organizador} = data;
  const html = gerarCertificado({
    eventObject,
    certificateObject,
    organizador,
    preview: true
  })
  return parse(html);
}