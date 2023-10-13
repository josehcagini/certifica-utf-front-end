import RoleEnum from "../../objects/RoleEnum";

export function isAdmin( roles ){
    return roles.includes( RoleEnum.ADMIN );
}

export function toRoleEnum( rolesValue ){

    var roleByDescription = new Map([
        ["ROLE_USER", RoleEnum.USER],
        ["ROLE_ADMIN", RoleEnum.ADMIN],
    ]);

    var rolesEnum = [];

    rolesValue.forEach(element => {
        rolesEnum.push( roleByDescription.get( element ) ?? RoleEnum.UNKNOW );
    });

    return rolesEnum;
}