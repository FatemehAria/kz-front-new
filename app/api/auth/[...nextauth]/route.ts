import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_SECRET_ID as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          redirect_uri: "https://www.keykavoos.co/",
        },
      },
    }),
  ],
  secret: "62d67d70ec48144ff98e8fedc1b0c9c8311f4baee190853a29a2bff7fcd69add",
  debug: true,
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
