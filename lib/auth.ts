import Auth0Provider from 'next-auth/providers/auth0'

import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from "@/lib/prisma"

export const authOptions = {
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