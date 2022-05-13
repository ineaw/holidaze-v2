import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "../../../services/auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Sign in with Email",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {

                if (credentials == null) return null;
                try {
                    const { user, jwt } = await signIn({
                        email: credentials.email,
                        password: credentials.password,
                    });
                    return { ...user, jwt };
                } catch (error) {
                    return null;
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),

    ],
    callbacks: {
        session: async ({ session, token }) => {
            session.id = token.id;
            session.jwt = token.jwt;
            return Promise.resolve(session);
        },
        jwt: async ({ token, user }) => {
            const isSignIn = user ? true : false;
            if (isSignIn) {
                token.id = user.id;
                token.jwt = user.jwt;
            }
            return Promise.resolve(token);
        },
    },
});
