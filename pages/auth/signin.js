import {getProviders, signIn as SignIntoProvider } from "next-auth/react";
import Header from "@/components/Header";
import Image from "next/image";
import { insta_logo } from "@/public/image";

//Browser...
function signIn({providers}) {
  return (
    <>
    <Header />
    <div className="flex flex-col items-center justify-center mb-20 px-14 text-center min-h-screen">
        <Image src={insta_logo} className="w-10 pb-6" width={10} height={10} />
        <p className="font-xs italic"> This is not a Real App, It is for Practice...</p>
        <div className="mt-10">
            {Object.values(providers).map((provider) => (
            <div key={provider.name}>
                <button className="p-3 bg-blue-500 rounded-lg text-white " onClick={() => SignIntoProvider(provider.id, {callbackUrl: "/"})}>
                Sign in with {provider.name}
                </button>
            </div>
            ))}
        </div>
    </div>
   
  </>
  )
}


//Server side rendering
export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers
        }
    }
}

export default signIn