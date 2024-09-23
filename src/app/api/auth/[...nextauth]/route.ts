import NextAuth from "next-auth/next";
import GoogLeProvider from "next-auth/providers/google"

const handLer = NextAuth({
    providers: [
        GoogLeProvider({
            clientId: process.env.CLIENT_ID!,
            clientSecret: process.env.CLIENT_SECRET!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
})

export {handLer as GET, handLer as POST};
