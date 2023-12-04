const { UnauthirizedError, ConflictError } = require("@/objects/errors/http_errors");

export async function fetchData(input, init){
    const response = await fetch(input, init);
    if(response.ok){
        return response;
    }else{
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        if(response.status === 401){
            throw new UnauthirizedError(errorMessage)
        } else if(response.status === 409){
            throw new ConflictError(errorMessage)
        }else{
            throw Error("Resquest failed with status: " + response.status + " mesagge: " + errorMessage);
        }
    }
}

export function buildInit( session, typeRequest = "GET", bodyRequest = null ) {
   return {
        method: typeRequest,
        headers: {
            "Content-Type": "application/json",
            "Authorization": session?.data?.access_token?.api,

        },
        ...( bodyRequest && { body: JSON.stringify(bodyRequest) })
    }
}