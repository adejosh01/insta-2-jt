import Stories from "./Stories"
import Posts from "./Posts"
import MiniProfile from "./MiniProfile"
import Suggestions from "./Suggestions"
import { useSession } from "next-auth/react"

function Feed() {
    const {data: session } = useSession();
  return (
    <main className={`flex flex-col md:flex-row md:max-w-3xl  xl:max-w-6xl mx-auto ${session && "!flex !flex-col !md:flex-row  !max-w-6xl"}`}>
        {/* Section  */}
        <section className="cols-span-2 md:w-[850px]" >
             {/* Stories */}
             <Stories />
             {/* Posts   */}
             <Posts />
        </section>

        {session && (
           <section className="hidden xl:inline-grid md:col-span-1">
              <div className="fixed top-20 ml-[850px]">
                  <MiniProfile />
                  <Suggestions />
              </div>
          
            </section>
        )}
            

    </main>
  )
}

export default Feed