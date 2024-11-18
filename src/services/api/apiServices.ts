import { StatusCodes } from 'http-status-codes'

import authProviderEnum from '@/enums/authProvidersEnum'
import apiEndpointsEnum from '@/enums/endpointsEnum'
import { fetchServer } from '@/services/fetch/fetchServer'
import { defaultHeaders } from '@/services/fetch/headers'
import logger from '@/services/winston/logger'
import SomethingWentWrongError from '@/types/errors/SomethingWentWrongError'
import UnauthorizedError from '@/types/errors/UnauthorizedError'
import IResponseHandler from '@/types/IResponseHandler.'
import IUserDto from '@/types/IUserDto'

function parseResponseToUser(data: any): IUserDto {
  return {
    nrUuid: data.nrUuid,
    name: data.name,
    email: data.email,
    accessToken: data.accessToken,
    roles: data.roles,
  } as IUserDto
}

export async function loginWithGoogle(
  typeProvider: authProviderEnum,
  idToken: string
): Promise<IResponseHandler<IUserDto, unknown>> {
  try {
    const response = await fetchServer(apiEndpointsEnum.LOGIN, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({
        typeProvider: typeProvider.toUpperCase(),
        idToken,
      }),
    })

    if (response.status === StatusCodes.OK) {
      const data = await response.json()
      const userLogin = parseResponseToUser(data)

      return { sucess: userLogin, error: null }
    }

    if (response.status === StatusCodes.UNAUTHORIZED) {
      throw new UnauthorizedError(
        'Você não tem permissão para realizar esta operação'
      )
    }

    throw new SomethingWentWrongError('Algo deu errado')
  } catch (error) {
    logger.log({
      level: 'error',
      message: '[loginWithGoogle] error',
      objects: {
        error,
      },
    })
    return { sucess: null, error: error }
  }
}

export async function loginWithCredentials(
  typeProvider: authProviderEnum,
  ra: string,
  password: string
): Promise<IResponseHandler<IUserDto, unknown>> {
  try {
    const typeProviderUTFPR =
      typeProvider === authProviderEnum.CREDENTIALS ? 'UTFPR' : 'CREDENTIALS'

    const response = await fetchServer(apiEndpointsEnum.LOGIN, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({
        typeProvider: typeProviderUTFPR,
        login: ra,
        password: password,
      }),
    })

    if (response.status === StatusCodes.OK) {
      const data = await response.json()
      const userLogin = parseResponseToUser(data)

      return { sucess: userLogin, error: null }
    }

    if (response.status === StatusCodes.UNAUTHORIZED) {
      throw new UnauthorizedError(
        'Você não tem permissão para realizar esta operação'
      )
    }

    throw new SomethingWentWrongError('Algo deu errado')
  } catch (error) {
    logger.log({
      level: 'error',
      message: '[loginWithGoogle] error',
      objects: {
        error,
      },
    })
    return { sucess: null, error: error }
  }
}
