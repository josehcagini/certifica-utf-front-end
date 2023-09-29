
export async function getAcessTokenAPI( account ) {

    const API_URL = `${process.env.API_BASE_URL}/api/auth/signIn`;

    const idToken = account.id_token;
    const dhExpires = account.expires_at
    const dsProvider = account.provider.toUpperCase();

    var request = {
        token: idToken,
        typeProvider: dsProvider,
    }

    const response = await fetch(
        API_URL, {
            method: "POST",
            body: JSON.stringify( request ) 
        }
    )

    const result = await response.json();

    return result.token;

}