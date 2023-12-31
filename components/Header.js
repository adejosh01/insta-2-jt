import Image from "next/image";
import { Instagram_logo, insta_logo, bigjosh } from "@/public/image";
import {SearchIcon, PlusCircleIcon, UserGroupIcon, HeartIcon, PaperAirplaneIcon, MenuIcon, HomeIcon} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "@/atoms/modalAtom";

function Header() {
    const {data: session } = useSession();
    const router = useRouter();
    const [open, setOpen] = useRecoilState(modalState);
   

    

  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50 ">
       <div className="flex justify-between items-center max-w-6xl mx-5 lg:mx-auto ">
            {/* Left */}
            <div onClick={() => router.push('/')} className="relative hidden lg:inline-grid w-24 h-24">
                <Image
                src={Instagram_logo}
                layout="fill"
                objectFit="contain"
                />
            </div>
 
            <div onClick={() => router.push('/')} className="relative w-10 h-10 lg:hidden flex-shrink-0 cursor-pointer ">
                <Image
                src={insta_logo}
                layout="fill"
                objectFit="contain"
                />
            </div>
            
            {/* Middle - Search Input field  */}
            <div className="max-w-xs">
                <div className="relative mt-1 p-3 rounded-md ">
                    <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-gray-500"  />
                    </div>
                    <input type="text" className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md " placeholder="Search" />
                </div>
            </div>
            

        
            {/* Right */}
            <div className="flex items-center justify-end space-x-4">
                <HomeIcon className="navBtn" onClick={() => router.push("/")} />
                <MenuIcon className="h-6 md:hidden cursor-pointer " />

                {session ? (
                <>
                    <div className="relative navBtn">
                    <PaperAirplaneIcon className="navBtn rotate-45" />
                    <div className="absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white ">3</div>
                </div>

                <PlusCircleIcon onClick={() => setOpen(true)} className="navBtn" />
                <UserGroupIcon className="navBtn" />
                <HeartIcon className="navBtn" />

                <div>
                  <Image onClick={signOut} src={session.user.image} width={40} height={40} alt="profile pic" className="rounded-full cursor-pointer" />
                </div>

                </>

                ) : (
                    <button onClick={signIn}>signIn</button>
                )}

               
               
            </div>
        </div>
    </div>
  )
}

export default Header