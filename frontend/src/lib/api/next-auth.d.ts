import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            user_id: number;
            username: string;
            email: string;
        };

        backendTokens: {
            accessToken: string;
            refreshToken: string;
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user: {
            user_id: number;
            username: string;
            email: string;
        };

        backendTokens: {
            accessToken: string;
            refreshToken: string;
        }
    }
}