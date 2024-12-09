import Image from 'next/image'
import Link from 'next/link'

import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface EventCardProps {
  id: string
  title: string
  type: string
  description: string
  date: string
  imageUrl: string
}

export function EventCard({
  id,
  title,
  type,
  description,
  date,
  imageUrl,
}: EventCardProps) {
  return (
    <Link href={`/event/detail/${id}`}>
      <Card className="flex h-72 gap-4 p-4 transition-colors hover:bg-accent">
        <Image
          src={imageUrl}
          alt={title}
          width={120}
          height={120}
          className="w-1/3 rounded-lg object-cover"
        />
        <div className="space-y-2">
          <CardHeader className="p-0">
            <div className="text-sm text-muted-foreground">{type}</div>
            <h3 className="font-semibold">{title}</h3>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-sm text-muted-foreground">{description}</p>
            <p className="mt-2 text-sm">{date}</p>
          </CardContent>
        </div>
      </Card>
    </Link>
  )
}
