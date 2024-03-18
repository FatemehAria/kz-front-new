import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import AzureADProvider from "next-auth/providers/azure-ad";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_SECRET_ID as string,
    }),
    AzureADProvider({
      clientId: `${process.env.AZURE_AD_CLIENT_ID}`,
      clientSecret: `${process.env.AZURE_AD_CLIENT_SECRET}`,
      tenantId: `${process.env.AZURE_AD_TENANT_ID}`,
      authorization: {
        params: { scope: "openid email profile User.Read offline_access" },
      },
      httpOptions: { timeout: 10000 },
    }),
  ],
  // callbacks: {
  //   async jwt({ token, user, account }) {
  //     if (account && user) {
  //       return {
  //         accessToken: account.id_token,
  //         accessTokenExpires: account?.expires_at
  //           ? account.expires_at * 1000
  //           : 0,
  //         refreshToken: account.refresh_token,
  //         user,
  //       };
  //     }

  //     if (Date.now() < token.accessTokenExpires - 100000 || 0) {
  //       return token;
  //     }
  //   },
  //   async session({ session, token }) {
  //     if (session) {
  //       session.user = token.user;
  //       session.error = token.error;
  //       session.accessToken = token.accessToken;
  //     }
  //     return session;
  //   },
  // },
  secret: "62d67d70ec48144ff98e8fedc1b0c9c8311f4baee190853a29a2bff7fcd69add",
  debug: true,
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
