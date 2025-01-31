import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions: NextAuthOptions = {

    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "Email"
                },
                password: {
                    label: "Password",
                    type: "password"
                },
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) return null;
                const { email, password } = credentials;
                const res = await fetch('http://localhost:8000/auth/login', {
                    method: 'POST',
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                if (res.status == 401) {
                    console.log(`Login failed: ${res.statusText}`);
                    return null;
                }
                const user = await res.json();
                return user;
            },

        })
    ],

    callbacks: {
        async jwt({token,user}) {
            console.log({token,user});
            if (user) return {...token, ...user};
            return token;
        },

        async session({session, token}) {
            session.user = token.user;
            session.backendTokens = token.backendTokens;
            return session;
        }
    }

}

const handler = NextAuth(authOptions);


export {handler as GET, handler as POST};