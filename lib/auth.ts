import 'server-only';
import NextAuth from 'next-auth';
import Okta from 'next-auth/providers/okta';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Okta],
});
