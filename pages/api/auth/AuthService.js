import { toRoleEnum } from '../../../src/services/user/UserService' // TODO Trocar para o valor absuluto no lugar do ../

export async function getAcessTokenAPI( account ) {

    const API_URL = `${process.env.API_BASE_URL}/api/auth/signIn`;

    const idToken = account.id_token;
    const dhExpires = account.expires_at
    const dsProvider = account.provider.toUpperCase();

    var request = {
        idToken: idToken,
        typeProvider: dsProvider,
    }

    const response = await fetch(
        API_URL, {
            method: "POST",
            body: JSON.stringify( request ) 
        }
    )

    return await response.json();

}

export function toAccount( account, response ) {

    account.access_token_api = response.accessToken;
    account.roles = toRoleEnum( response.roles );

    return account;
}
