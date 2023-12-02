function getUserRole(session){
    return session?.data?.user?.roles ?? [];
}

function getNrUuid(session){
    return session?.data?.user?.nrUuid ?? null;
}

function getUserData(session){
    return session?.data?.user ?? {};
}

export { getUserRole, getNrUuid, getUserData };