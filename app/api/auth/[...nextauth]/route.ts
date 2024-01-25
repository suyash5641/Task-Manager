import prisma from "@/lib/prisma";
import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";
import NextAuth from "next-auth/next";

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.id || !user.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const correctPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!correctPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV !== "production",
};

//   pages: {
//     signIn: "/auth/signin",
//   },
//   session: {
//     strategy: "jwt",
//   },
//   jwt: {
//     secret: process.env.NEXTAUTH_SECRET,
//   },
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID ?? "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
//       idToken: true,

//       authorization: {
//         params: {
//           scope: "openid profile email",
//         },
//       },
//     }),
//     CredentialsProvider({
//       name: "Credentials",

//       credentials: {
//         username: {
//           label: "User Name",
//           type: "text",
//           placeholder: "Your User Name",
//         },
//         password: {
//           label: "Password",
//           type: "password",
//         },
//       },
//       async authorize(credentials) {
//         const user = await prisma.user.findUnique({
//           where: {
//             email: credentials?.username,
//           },
//         });

//         if (!user) throw new Error("User name or password is not correct");

//         // This is Naive Way of Comparing The Passwords
//         // const isPassowrdCorrect = credentials?.password === user.password;
//         if (!credentials?.password)
//           throw new Error("Please Provide Your Password");
//         const isPassowrdCorrect = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );

//         if (!isPassowrdCorrect)
//           throw new Error("User name or password is not correct");

//         if (!user.emailVerified)
//           throw new Error("Please verify your email first!");

//         const { password, ...userWithoutPass } = user;
//         return userWithoutPass;
//       },
//     }),
//   ],

//   //   callbacks: {
//   //     async jwt({ token, user }) {
//   //       if (user) token.user = user as User;
//   //       return token;
//   //     },

//   //     async session({ token, session }) {
//   //       session.user = token.user;
//   //       return session;
//   //     },
//   //   },
// };

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
