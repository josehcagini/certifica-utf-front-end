'use client';

import { SessionProvider as Provider } from "next-auth/react";
import React from "react";

export default function SessionProvider( { children }){
    return(
        <Provider>
            {children}
        </Provider>
    );
}