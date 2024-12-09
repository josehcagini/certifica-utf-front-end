import { EventCard } from './_components/event-card'

export default function EventList() {
  return (
    <div className="mx-auto p-4">
      <h1 className="mb-8 text-2xl font-bold">Eventos</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {mockEvents.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </div>
  )
}

const mockEvents = [
  {
    id: '1',
    type: 'Palestra',
    title: 'Liderança e Gestão de Equipes em Tempos de Mudança',
    description:
      'Uma palestra sobre como liderar equipes com empatia e resiliência, especializando em cenários de mudança radical.',
    date: '12 de março de 2024',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/7/75/La_caza_salvaje_de_Od%C3%ADn%2C_por_Peter_Nicolai_Arbo.jpg',
  },
  {
    id: '2',
    type: 'Workshop',
    title: 'Marketing Digital para Pequenos Negócios',
    description:
      'Workshop voltado para empreendedores e profissionais da indústria que querem aprender estratégias eficazes para atrair clientes.',
    date: '20 de abril de 2024',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/7/75/La_caza_salvaje_de_Od%C3%ADn%2C_por_Peter_Nicolai_Arbo.jpg',
  },
  {
    id: '3',
    type: 'Minicurso',
    title: 'Introdução ao Design de Interfaces Intuitivas',
    description:
      'Mini-curso prático que ensina os fundamentos do design UI/UX com interfaces mais acessíveis e fáceis de usar.',
    date: '5 de maio de 2024',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/7/75/La_caza_salvaje_de_Od%C3%ADn%2C_por_Peter_Nicolai_Arbo.jpg',
  },
]
