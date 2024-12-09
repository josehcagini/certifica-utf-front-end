import { Calendar, Clock, MapPin, Users } from 'lucide-react'
import Image from 'next/image'

import { Card, CardContent } from '@/components/ui/card'

const mockEvent = {
  id: '1',
  name: 'Blockchain Hackathon',
  initialDate: '2024-11-24T00:00:00.000Z',
  finalDate: '2024-12-01T00:00:00.000Z',
  workload: 50,
  description:
    'O Blockchain Hackathon é um evento colaborativo e intensivo que reúne desenvolvedores, entusiastas de blockchain, designers e empreendedores para explorar, inovar e criar soluções utilizando tecnologias descentralizadas. Durante o evento, participantes terão a oportunidade de trabalhar em equipe para desenvolver projetos que aproveitam o potencial da blockchain, resolvendo problemas reais e propondo inovações em áreas como finanças, saúde, supply chain, NFTs, contratos inteligentes e muito mais.',
  location: {
    description: 'B6-S1',
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19447.50491798907!2d-1.9098!3d52.4862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870942d1b417173%3A0xca81fef0aeee7998!2sBirmingham%2C+UK!5e0!3m2!1sen!2suk!4v1160000000000!5m2!1sen!2suk',
  },
  eventDates: [
    {
      id: '1',
      initialDate: '2024-11-24T00:00:00.000Z',
      finalDate: '2024-11-25T00:00:00.000Z',
    },
    {
      id: '2',
      initialDate: '2024-11-26T00:00:00.000Z',
      finalDate: '2024-12-01T00:00:00.000Z',
    },
  ],
  image:
    'https://upload.wikimedia.org/wikipedia/commons/7/75/La_caza_salvaje_de_Od%C3%ADn%2C_por_Peter_Nicolai_Arbo.jpg',
  participants: 50000,
  availableSpots: 99,
}

export default function EventDetailsPage() {
  return (
    <div className="">
      {/* Banner and Title */}
      <div className="relative">
        <Image
          src={mockEvent.image}
          alt=""
          width={1200}
          height={300}
          className="h-[300px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
        <h1 className="absolute bottom-8 left-8 text-3xl font-bold">
          {mockEvent.name}
        </h1>
      </div>

      <div className="space-y-8 p-8">
        {/* Event Details Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Dados do evento</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>
                    {new Date(mockEvent.initialDate).toLocaleDateString(
                      'pt-BR'
                    )}{' '}
                    à{' '}
                    {new Date(mockEvent.finalDate).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>{mockEvent.workload}h Carga Hóraria</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Local</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p>{mockEvent.location.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>{mockEvent.availableSpots} Vagas</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Description */}
        <div>
          <h2 className="mb-4 text-lg font-semibold">Descrição</h2>
          <p className="text-muted-foreground">{mockEvent.description}</p>
        </div>

        {/* Schedule */}
        <div>
          <h2 className="mb-4 text-lg font-semibold">Datas</h2>
          <div className="space-y-2">
            {mockEvent.eventDates.map((eventDate) => (
              <Card key={eventDate.id} className="bg-muted/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-row">
                      <Calendar className="inline h-5 w-5 text-primary" />
                      <p className="text-sm text-muted-foreground">
                        {eventDate.initialDate} à {eventDate.finalDate}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Map */}
        <div>
          <h2 className="mb-4 text-lg font-semibold">Localização</h2>
          <div className="aspect-video w-full overflow-hidden rounded-lg border">
            <iframe
              title="Mapa do Evento"
              src={mockEvent.location.mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
