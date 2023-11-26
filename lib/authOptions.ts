import Auth0Provider from 'next-auth/providers/auth0'
import { AuthOptions,  } from 'next-auth';

import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from "@/lib/prisma"

export const authOptions : AuthOptions = {
    adapter : PrismaAdapter(prisma),
    providers : [
        Auth0Provider({
            clientId : process.env.AUTH0_CLIENT_ID || '',
            clientSecret : process.env.AUTH0_CLIENT_SECRET || '',
            issuer : process.env.AUTH0_ISSUER_BASE_URL || '',
            authorization : {
                params : {
                    prompt : 'login'
                }
            }
        })
    ],
    pages : {
        signIn : "/signIn"
    },
    secret : process.env.AUTH0_SECRET || '',
};