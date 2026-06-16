import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { supabaseServer } from '@/lib/supabase-server';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'select_account',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],

  pages: {
    signIn: '/login',
    error: '/login',
  },

  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        return false;
      }

      try {
        const { data, error } = await supabaseServer
          .from('allowed_users')
          .select('email')
          .eq('email', user.email.toLowerCase())
          .single();

        if (error || !data) {
          return false;
        }

        return true;
      } catch (error) {
        console.error('Auth error:', error);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
