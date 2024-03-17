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
      clientId: "9f5c260a-0961-4424-94ea-d7c49a978bf6",
      clientSecret: `${process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_SECRET}`,
      tenantId: `${process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}`,
      authorization: {
        params: { scope: "openid email profile User.Read  offline_access" },
      },
      httpOptions: { timeout: 10000 },
    }),
  ],
  secret: "62d67d70ec48144ff98e8fedc1b0c9c8311f4baee190853a29a2bff7fcd69add",
  debug: true,
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
