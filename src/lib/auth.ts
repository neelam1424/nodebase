
import {checkout, polar, portal} from "@polar-sh/better-auth"

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import prisma from "./db";
import { polarClient } from "./polar";


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword:{
        enabled: true,
        autoSignIn: true,
    },
    plugins:[
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use:[
                checkout({
                    products:[
                        {
                            
                            productId: "20e956f2-99ee-49a4-bfb8-a4e3ca1bbea4",
                            slug: "pro" 
                        
                        }
                    ],
                    successUrl: process.env.POLAR_SUCCESS_URL,
                    authenticatedUsersOnly: true,


                }),
                portal(),
            ]
        })
    ]
});