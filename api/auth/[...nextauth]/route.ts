import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '@/lib/prisma';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // save user to database on first login
      await prisma.user.upsert({
        where: { email: user.email! },
        update: {},
        create: {
          email: user.email!,
          name: user.name,
          image: user.image,
        },
      });
      return true;
    },
    async session({ session }) {
      // attach user id to session
      const dbUser = await prisma.user.findUnique({
        where: { email: session.user.email! },
      });
      session.user.id = dbUser?.id;
      session.user.role = dbUser?.role;
      return session;
    },
  },
});

export { handler as GET, handler as POST };