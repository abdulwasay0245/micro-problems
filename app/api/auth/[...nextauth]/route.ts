import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { sql } from "@/lib/db";
import { nanoid } from "nanoid";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    // 1. Runs when user signs in → saves user to database
    async signIn({ user }) {
      try {
        const id = nanoid(25);
        await sql`
          INSERT INTO "User" (id, email, name, image, role, "createdAt")
          VALUES (${id}, ${user.email}, ${user.name}, ${user.image}, 'user', NOW())
          ON CONFLICT (email) DO UPDATE 
          SET name = EXCLUDED.name, image = EXCLUDED.image
        `;
        return true;
      } catch (error) {
        console.error('SignIn error:', error); // ✅ this will show in Vercel logs
        return false;
      }
    },

    // 2. Runs when JWT token is created → adds role to token
    async jwt({ token, user }) {
      // 'user' is only passed the very first time the user logs in.
      // On sub-sequent requests (like loading /report), we only have 'token'.
      const sessionEmail = user?.email || token?.email;
      
      if (sessionEmail && !token.role) {
        try {
          const result = await sql`
            SELECT role FROM "User" WHERE email = ${sessionEmail} LIMIT 1
          `;
          if (result.length > 0) {
            token.role = result[0].role; // ✅ store role inside token
          }
        } catch (error) {
           console.error('JWT Session Error:', error);
        }
      }
      return token;
    },

    // 3. Runs when session is accessed → adds role and id to session
    async session({ session, token }) {
      session.user.role = token.role as string; // ✅ make role available in useSession()
      return session;
    },
  },
});

export { handler as GET, handler as POST };