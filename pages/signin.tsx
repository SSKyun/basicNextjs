import { NextPageContext } from "next";
import { BuiltInProviderType } from "next-auth/providers";
import { ClientSafeProvider, getProviders, getSession, LiteralUnion,signIn } from "next-auth/react";

export default function SignIn({providers} : {providers : Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null}){
    return <div><button onClick={()=>signIn(providers?.kakao.id)}>Kakao Login</button></div>
}


export async function getServerSideProps(context: NextPageContext) {
    const { req, res } = context;
    const session = await getSession({ req });
  
    if (session && res && session.user) {
      res.writeHead(302, {
        Location: "/",
      });
      res.end();
      return;
    }
    return {
      props: {
        providers: await getProviders(),
      },
    };
  }