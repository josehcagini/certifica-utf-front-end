import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface ProfileAvatarProps {
  profileImageUrl: string
  profileName: string
  profileImageFallback: string
}

export function ProfileAvatar({
  profileImageUrl,
  profileName,
  profileImageFallback,
}: ProfileAvatarProps) {
  return (
    <Avatar>
      <AvatarImage src={profileImageUrl} alt={profileName} />
      <AvatarFallback>{profileImageFallback}</AvatarFallback>
    </Avatar>
  )
}
