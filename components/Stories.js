//import { faker } from "@faker-js/faker"
//import { useEffect } from "react";

import stories from "./Static/Stories";
import Story from "./Story";
import { useSession } from "next-auth/react";

function Stories() {
  const {data: session} = useSession()
  return (
    <div className="flex space-x-2 p-6 bg-white md:w-[850px] mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-[20px] scrollbar-thumb-[gray] ">
        {/* Story */}

        {session && (
            <Story img={session.user.image} username={session.user.username} />
        )}

        {stories.map((story) => (
            <Story key={story.id} img={story.src} username={story.username} />
        ))}
        
    </div>
  )
}

export default Stories