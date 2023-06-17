import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon
} from "@heroicons/react/outline";
import {
  addDoc,
  collection,
  deleteDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  doc,
} from "firebase/firestore";
import { db, } from "@/firebase";

import {HeartIcon as HeartIconFilled} from "@heroicons/react/solid"
import { useSession } from "next-auth/react";
import Moment from "react-moment"
import Image from "next/image";
import { useEffect, useState } from "react";

function Post({ id, username, userImg, img, caption }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false)
  

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        snapshot => setComments(snapshot.docs)
      ),
    [db]
  );



  useEffect(
   () => 
      onSnapshot(collection(db, "posts", id, "likes"),
       snapshot => setLikes(snapshot.docs)
      ),
    [db, id]
    );


    useEffect(
      () => setHasLiked(
      likes.findIndex((like) => like.id === session?.user?.id) !== -1
   ), 
   [likes]
   );



    const likePost = async () => {
         if (hasLiked) {
            await deleteDoc(doc(db, "posts", id, "likes", session.user.id))
         } else {
            await setDoc(doc(db, "posts", id, "likes", session.user.id), {
               username: session.user.username,
            })
         }
    }


   

  const sendComment = async e => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp()
    });
  };

  return (
    <div className="bg-white my-7 border pb-1 rounded-sm">
      {/* Header */}
      <div className="flex items-center p-5 ">
        <Image
          src={userImg}
          width={200}
          height={200}
          alt=""
          className="rounded-full h-12 w-12 object-fill border p-1 mr-3"
        />
        <p className="flex-1 font-bold">
          {username}
        </p>
        <DotsHorizontalIcon className="h-5" />
      </div>

      {/* img */}
      <Image
        src={img}
        width={200}
        height={200}
        className="object-cover w-full "
      />

      {/* Buttons  */}
      {session &&
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
               <HeartIconFilled  onClick={likePost} className="btn text-red-500"  />
            ): (
               <HeartIcon onClick={likePost} className="btn" />
            )
         }
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>

          <BookmarkIcon className="btn" />
        </div>}

      {/* caption  */}
      <p className="p-5 truncate">
         {likes.length > 0 && (
            <p className="font-bold mb-1">{likes.length} likes</p>
         )}
        <span className="font-bold mr-1">
          {username}
        </span>
        {caption}
      </p>

      {/* comments */}
      {comments.length > 0 &&
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-[20px]">
          {comments.map(comment =>
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <Image
                className="h-7 w-7 rounded-full"
                src={comment.data().userImage}
                width={10}
                height={10}
              />
              <p className="text-sm flex-1">
                <span className="font-bold">
                  {comment.data().username}
                </span>{" "}
                {comment.data().comment}
              </p>

              <Moment fromNow className="pr-5 text-xs">
                  {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          )}
        </div>}

      {/* input box */}
      {session &&
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7" />
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={e => setComment(e.target.value)}
            className="border-none flex-1 focus:ring-0 outline-none"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="font-semibold text-blue-500"
          >
            Post
          </button>
        </form>
        }
    </div>
  );
}

export default Post;
