import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: { strategy: "jwt" },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        console.log("Received Credentials:", credentials);

        if (
          credentials?.email === "user@vibe.com" &&
          credentials?.password === "password"
        ) {
          return {
            id: "1",
            name: "John Vibe",
            email: "user@vibe.com",
            image: "https://i.pravatar.cc/150?img=12",
          };
        }

        return null;
      },
    }),
  ],
});

// REQUIRED FOR NEXTAUTH API ROUTE
export { handler as GET, handler as POST };
