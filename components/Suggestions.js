import { useState, useEffect } from "react"
import suggestions from "./Static/Suggestions"
import Image from "next/image"

function Suggestions() {
    
  return (
    <div className="mt-10 ml-20">
        <div className="flex justify-between text-sm mb-5">
            <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
            <button className="text-gray-600 font-semibold">See All</button>
        </div>
        {
            suggestions.map(profile => (
                <div key={profile.id} className="flex justify-between items-center mt-3">
                    <Image src={profile.src} height={30} width={30} className="w-10 h-10 rounded-full border p-[2px]" />

                    <div className="flex-1 ml-4">
                        <h2 className="font-semibold text-sm">{profile.username}</h2>
                        <h3 className="text-xs text-gray-400">Works at {profile.company}</h3>
                    </div>

                    <button className="text-blue-400 text-sm">Follow</button>

                </div>
            ))
        }

    </div>
  )
}

export default Suggestions