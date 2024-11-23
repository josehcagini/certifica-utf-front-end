import userRolesEnum from '@/enums/userRoleEnum'

export default interface IUserDto {
  nrUuid: string
  name: string
  email: string
  accessToken: string
  roles: Array<userRolesEnum>
}
